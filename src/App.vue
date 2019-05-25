<template>
    <v-app>
        <v-toolbar flat
                   prominent>
            <v-toolbar-title class="headline text-uppercase">
                <v-btn id="drawerOpenButton"
                       class="default v-btn--simple"
                       icon
                       @click.stop="openDrawer">
                    <v-icon>view_list</v-icon>
                </v-btn>
                <span v-text="$t('appName')"></span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    flat
                    href="https://github.com/vuetifyjs/vuetify/releases/latest"
                    target="_blank">
                <span class="mr-2">Latest Release</span>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer
                v-model="drawer"
                app
                dark
                floating
                persistent
                mobile-break-point="991"
                width="260">
            <v-img
                    :src="image"
                    :gradient="sidebarOverlayGradiant"
                    height="100%"
            >
                <v-layout
                        class="fill-height"
                        tag="v-list"
                        column
                >
            <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="https://randomuser.me/api/portraits/women/10.jpg">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>John Test</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>

                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        :to="item.to"
                        active-class="success"
                        class="v-list-item">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title
                            v-text="item.title"
                    />
                </v-list-tile>
            </v-list>
                </v-layout>
            </v-img>
        </v-navigation-drawer>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
const image = 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg';
const sidebarBackgroundColor = 'rgba(27, 27, 27, 0.74)';

export default {
  name: 'App',
  data() {
    return {
      image,
      drawer: null,
      items: [
        { to: '/', title: 'Home', icon: 'dashboard' },
        { to: '/about', title: 'About', icon: 'question_answer' },
      ],
    };
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer;
    },
  },
  computed: {
    sidebarOverlayGradiant() {
      return `${sidebarBackgroundColor}, ${sidebarBackgroundColor}`;
    },
  },
};
</script>
