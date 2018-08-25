<template>
  <v-app>
    <v-content>
      <v-container fluid>
<!--
        <div>
          <h2>Original Expand Table</h2>
          <v-data-table :headers="headers" :items="desserts" hide-actions item-key="name" expand>
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
              </tr>
            </template>

            <template slot="expand" slot-scope="props">
              <v-card flat>
                <v-card-text>Summary - {{props.item.name}}</v-card-text>
              </v-card>
            </template>

          </v-data-table>
        </div>
-->

<!---->
        <div>
          <h2>Grouping Table</h2>
          <v-data-table :headers="headers" :items="desserts" hide-actions item-key="name" group-key="category">

            <template slot="group" slot-scope="props">
              <v-card flat>
                <v-card-text>Group {{props.groupIndex}} - {{props.groupName}}</v-card-text>
              </v-card>
            </template>

            <template slot="expand" slot-scope="props">
              <v-card flat >
                <v-card-text>Summary - {{props.item.name}}</v-card-text>
              </v-card>
            </template>

              <tr slot="items" slot-scope="props" @click="props.expanded = !props.expanded">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
              </tr>

          </v-data-table>
        </div>

<!--
        <v-list>
          <v-list-group
            v-model="aItem.active"
            :key="aItem.title"
            :prepend-icon="aItem.action"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ aItem.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="subItem in aItem.items"
              :key="subItem.title"
              @click=""
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>

            </v-list-tile>

          </v-list-group>
        </v-list>
-->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      aItem: {
        action: 'local_activity',
        title: 'Attractions',
        items: [
          { title: 'List Item' }
        ]
      },


      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {text: 'Calories', value: 'calories' },
        {text: 'Fat (g)', value: 'fat' },
        {text: 'Carbs (g)', value: 'carbs' },
        {text: 'Protein (g)', value: 'protein' },
        {text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          value: false,
          name: 'Orange Juice',
          category: 'Beverage',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          value: false,
          name: 'Larabar',
          category: 'Snack',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          value: false,
          name: 'Donut',
          category: 'Breakfast',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },

        {
          value: false,
          name: 'Bagel',
          category: 'Breakfast',
          calories: 999,
          fat: 28.0,
          carbs: 151,
          protein: 2.9,
          iron: '29%'
        },
        {
          value: false,
          name: 'KitKat',
          category: 'Snack',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    })
  }
</script>
