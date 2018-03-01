<template>
    <v-layout row justify-center>
        <v-dialog :value="true" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Login</span><br>
                    <span>manablox-apibuilder</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field label="Legal first name" required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
  layout: "login"
};
</script>

