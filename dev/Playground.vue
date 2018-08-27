<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <div>
          <h2>Grouping Table</h2>
          <v-data-table :headers="headers" :items="desserts" hide-actions item-key="name" group-key="category">

            <template slot="group" slot-scope="props">
              <span class="font-weight-bold">Group {{props.groupIndex + 1}} - {{props.groupName}}</span>
            </template>

            <template slot="items" slot-scope="props" >
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.calories }}</td>
                <td>{{ props.item.fat }}</td>
                <td>{{ props.item.carbs }}</td>
                <td>{{ props.item.protein }}</td>
                <td>{{ props.item.iron }}</td>
              </tr>
            </template>

          </v-data-table>
        </div>

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
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
