import ExpandTransitionGenerator from '../../transitions/expand-transition'
import VIcon from '../../VIcon'

/* @vue/component */
export default {
  methods: {
    genTBody () {
      const children = this.genItems()

      return this.$createElement('tbody', children)
    },
    collapseAll () {
      this.activeGroup = {}
    },
    expandAll () {
      for (const group in this.activeGroup) {
        this.activeGroup[group] = true
      }
    },
    genGroupRow (props) {
      const groupPrefix = 'v-datatable__group'
      const expandIcon = this.$createElement('div', {
        'class': `${groupPrefix}__expand-icon`
      }, [this.$createElement(VIcon, this.expandIcon)])

      const groupContent = this.$createElement('div', {
        'class': `${groupPrefix}-content`
      }, [expandIcon, this.$scopedSlots.group(props)])

      const fixedColumnsCount = this.headers.filter(header => header.fixed === true).length

      const groupTds = [this.$createElement('td', {
        class: [
          `${groupPrefix}-col`,
          {
            [`${groupPrefix}-col--active`]: this.activeGroup[props.groupName],
            'fixed-column': fixedColumnsCount
          }
        ],
        on: {
          click: () => {
            const active = !this.activeGroup[props.groupName]
            this.$set(this.activeGroup, props.groupName, active)
            this.$emit('group', {
              active,
              ...props
            })
          }
        },
        attrs: { colspan: fixedColumnsCount || this.headerColumns }
      }, [groupContent])]

      if (fixedColumnsCount) {
        groupTds.push(this.$createElement('td', {
          class: 'group-column-spacer',
          attrs: { colspan: this.headerColumns - fixedColumnsCount }
        }))
      }
      return this.genTR(groupTds, { 'class': `${groupPrefix}-row`, key: props.groupName + props.groupIndex })
    },

    genExpandedRow (props) {
      const children = []

      if (this.isExpanded(props.item)) {
        const expand = this.$createElement('div', {
          class: 'v-datatable__expand-content',
          key: props.item[this.itemKey]
        }, [this.$scopedSlots.expand(props)])
        children.push(expand)
      }

      const transition = this.$createElement('transition-group', {
        class: 'v-datatable__expand-col',
        attrs: { colspan: this.headerColumns },
        props: {
          tag: 'td'
        },
        on: ExpandTransitionGenerator('v-datatable__expand-col--expanded')
      }, children)

      return this.genTR([transition], { class: 'v-datatable__expand-row' })
    },
    augmentRow (row) {
      const tds = row.tag === 'td' ? [row]
        : (row.tag === 'tr' ? row.children
          : (this.hasTag(row, 'td') ? row : row[0].children))

      let i = 0
      for (const td of tds) {
        if (this.headers[i] && (this.headers[i].fixed === true) && td.tag === 'td') {
          td.data = td.data || {}
          td.data.class = `${td.data['class'] || ''} fixed-column`.trim()
          td.data.style = {
            left: `${this.getFixedColumnLeft(i)}px`,
            width: this.headers[i].width
          }
          if (this.headers[i + 1] && !this.headers[i + 1].fixed) {
            td.data.class += ' last-fixed-column'
          }
          i++
        }
      }
    },
    /* eslint-disable max-statements */
    genFilteredItems () {
      if (!this.$scopedSlots.items) {
        return null
      }

      const rows = []
      let currentGroup
      for (let index = 0, groupIndex = 0, itemInGroupIndex = 0, len = this.filteredItems.length; index < len; ++index) {
        const item = this.filteredItems[index]
        const props = this.createProps(item, index)

        if (this.$scopedSlots.group && (!this.groupKey || currentGroup !== props.item[this.groupKey])) {
          itemInGroupIndex = 0
          currentGroup = props.item[this.groupKey]
          const groupProps = { groupName: currentGroup, groupIndex }
          const groupRow = this.genGroupRow(groupProps)
          rows.push(groupRow)
          groupIndex++
          if (!this.activeGroup.hasOwnProperty(currentGroup)) {
            this.$set(this.activeGroup, currentGroup, this.groupExpanded)
          }
        }

        if (this.$scopedSlots.group && !this.activeGroup[currentGroup]) {
          continue
        } else {
          props.itemInGroupIndex = itemInGroupIndex++
        }

        const row = this.$scopedSlots.items(props)

        this.augmentRow(row)

        rows.push(this.hasTag(row, 'td')
          ? this.genTR(row, {
            key: this.itemKey ? props.item[this.itemKey] : index,
            attrs: { active: this.isSelected(item) }
          })
          : row)

        if (this.$scopedSlots.expand) {
          const expandRow = this.genExpandedRow(props)
          rows.push(expandRow)
        }
      }

      return rows
    },
    /* eslint-enable max-statements */

    genEmptyItems (content) {
      if (this.hasTag(content, 'tr')) {
        return content
      } else if (this.hasTag(content, 'td')) {
        return this.genTR(content)
      } else {
        return this.genTR([this.$createElement('td', {
          class: {
            'text-xs-center': typeof content === 'string'
          },
          attrs: { colspan: this.headerColumns }
        }, content)])
      }
    }
  }
}
