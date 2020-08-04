<template>
    <div class="content" v-if="$store.state.loggedIn">
        <div id="form">
            <select v-model="articleType">
                <option value="article">Artikel</option>
                <option value="video">Video</option>
            </select>
            <input type="text" v-model="articleHeader" placeholder="Rubrik...">
            <div class="type-div" v-if="articleType === 'video'">
                <input type="text" v-model="articleVideo" placeholder="Youtube ID...">
            </div>
            <div class="type-div" v-if="articleType === 'article'">
                <div id="image-div">
                    <img id="thumbnail" :src="url" alt="Välj en bild">
                    <input id="article-image" @change="loadThumbnail" name="articleImage" placeholder="Välj bild" type="file" accept="image/x-png, image/gif, image/jpeg">
                </div>
                <textarea v-model="articleIngress" cols="30" rows="5" placeholder="Ingress"></textarea>
                <textarea v-model="articleBody" cols="30" rows="10" placeholder="Brödtext"></textarea>
            </div>
            <input type="button" value="Publicera" @click="$store.dispatch('postArticle')">
        </div>
    </div>
</template>

<script>
import { computed } from '../scripts/computed.js'

export default {
    name: 'PostView',
    computed: computed,
    data() {
        return {
            url: null
        }
    },
    methods: {
        print(input) {
            console.log(input)
        },
        loadThumbnail(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        }
    }
}
</script>

<style scoped>
    .content {
        display: flex;
        min-height: 70vh;
    }
    #form,
    .type-div {
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 30vw;
    }
    input,
    select,
    textarea {
        border-radius: 1em;
    }
    input[type="text"] {
        margin: 1px;
        height: 3vh;
        padding: 5px;
        border: solid 0.5px black;
    }
    textarea {
        margin: 1px;
        padding: 5px;
    }
    select {
        margin: 15px auto;
        height: 5vh;
        width: 30vw;
    }
    #image-div {
        padding: 15px;
        background-color: white;
        border-radius: 1em;
        border: solid 0.5px black;
        display: flex;
        flex-direction: column;
    }
    #thumbnail {
        width: 27vw;
        margin: auto;
    }
    input[type="file"] {
        margin: auto;
    }
    p {
        margin-bottom: 10px;
    }
    @media (orientation: portrait) {
        #form,
        .type-div,
        select,
        input[type="button"] {
            width: 95vw;
        }
        #thumbnail {
            width: 90vw;
        }
    }
</style>