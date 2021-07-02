<template>
  <div>
    <div v-for="(entry, eix) in pubs.entries" :key="eix">
      <h2>{{ entry.type }}</h2>
      <ul>
        <li v-for="(item, ix) in entry.items" :key="ix">
          <div class="pubs-headline">
            <span class="pubs-title">{{ item.title }},</span>
            <span class="pubs-author">
              <a :href="pubs.authors[item.author]">{{ item.author }}</a>
            </span>
          </div>
          <div class="pubs-venue" v-if="'venue' in item">{{ item.venue }}</div>
          <div class="pubs-links">
            <span v-for="(link, lix) in item.links" :key="lix">
              <a :href="findLinkFormatter(link[0])(link[1])">{{ findLinkName(link[0]) }}</a><template v-if="lix != item.links.length - 1">, </template>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pubs-headline {
  font-size: 1.1em;
}
.pubs-title {
}
.pubs-venue {
  font-style: italic;
  color: gray;
}
</style>

<script>
import pubs from '../pubs'
export default {
  name: 'Publications',
  data: () => ({
    pubs,
    links: {
      arxiv: {
        name: 'arXiv preprint',
        link: s => `https://arxiv.org/abs/${s}`,
      },
      doi: {
        name: 'doi',
        link: s => `https://doi.org/${s}`,
      },
      latest: {
        name: 'latest version',
        link: s => s,
      },
    },
  }),
  methods: {
    findLinkFormatter(tag) {
      if (tag in this.links) return this.links[tag].link
      else return s => s
    },
    findLinkName(tag) {
      if (tag in this.links) return this.links[tag].name
      else return tag
    }
  }
}
</script>
