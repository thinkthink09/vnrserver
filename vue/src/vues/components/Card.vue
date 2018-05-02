<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-layout row wrap>
            <v-flex>
              <h1 class="text-xs-center mt-5">{{title}}</h1>
            </v-flex>
          </v-layout>

          <v-card class="elevation-12 mt-5 pa-3">
            <slot>
              No content defined
            </slot>
          </v-card>

          <slot name="footer">
          </slot>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: [
    'title'
  ]
}
</script>
