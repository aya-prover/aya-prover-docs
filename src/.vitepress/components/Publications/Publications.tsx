import { h, defineComponent , PropType} from 'vue'
import type { Publicaions } from '../../interface'
import { publications } from '../../pubs'
import './PubStyle.css'

export default defineComponent({
  name: 'Publications',
  props:{
    pubs: {
      type: Array as PropType<Publicaions>,
      reqiured: true
      // default: publications
    }
  },
  setup(props) {
    const links:Record<string,{name:string,link:(s:string)=>string}> = {
      arxiv: {
        name: 'arXiv preprint',
        link: (s:string) => `https://arxiv.org/abs/${s}`,
      },
      doi: {
        name: 'doi',
        link: (s:string) => `https://doi.org/${s}`,
      },
      latest: {
        name: 'latest version',
        link: (s:string) => s,
      },
      conference: {
        name: 'conference version',
        link: (s:string) => s,
      },
    }

    function formattedLink(name:string, url:string):string {
      return links[name].link(url)
    }
    function getLinkName(name:string):string {
      return links[name].name
    }
    return {
      formattedLink,
      getLinkName,
    }
  },
  render() {
    return (
      <div>
        {this.pubs?.map(pub=>(
            <div>
              <h3>{pub.type}</h3>
              <ul>
                {pub.items.map(item=>
                  (
                    <li>
                      <div>
                        <span class="pubs-title">{item.title}</span>
                        <span class="pubs-author">
                          <a 
                            href={item.author.link}
                          >
                            {item.author.name}
                          </a>
                        </span>
                      </div>
                      {item.venue? <div class="pubs-venue">{item.venue}</div>:null}
                      <div>
                        {item.links.map(link=>(
                          <a 
                          class="pubs-link"
                          href={this.formattedLink(link[0],link[1])}
                          >
                            {this.getLinkName(link[0])}
                          </a>
                        ))}
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          )
        )}
      </div>
    )
  }
})