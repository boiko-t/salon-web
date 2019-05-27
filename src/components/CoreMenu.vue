<template>
    <div>
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
                    :gradient="sidebarOverlayGradient"
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
                                {{nameLabel}}
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title>{{name}}</v-list-tile-title>
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
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const imageUrl = 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg';
const sidebarBackgroundColor = 'rgba(27, 27, 27, 0.74)';

class DrawerItem {
    public to!: string;
    public title!: string;
    public icon!: string;

    constructor(to: string, title: string, icon: string) {
      this.to = to;
      this.title = title;
      this.icon = icon;
    }
}

@Component({
  computed: {
    sidebarOverlayGradient() {
      return `${sidebarBackgroundColor}, ${sidebarBackgroundColor}`;
    },

    name() {
      return this.$store.state.auth.name || this.$t('unknownUserName');
    },

    nameLabel() {
      return this.name.charAt(0);
    },
  },
})

export default class CoreMenu extends Vue {
    name!: string;
    image: string = imageUrl;
    drawer: any = null;

    items: DrawerItem[] = [
      new DrawerItem('/', 'Home', 'dashboard'),
      new DrawerItem('/about', 'About', 'question_answer'),
      new DrawerItem('/sign-in', 'Sign in', 'account_box'),
    ];

    openDrawer() {
      console.log(this.$t('unknownUserName'));
      this.drawer = !this.drawer;
    }
}
</script>
