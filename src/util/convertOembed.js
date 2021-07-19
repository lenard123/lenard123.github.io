import { getYoutubeId } from '@/util'

export default function(content) {
  let parent = document.createElement('div')
  parent.innerHTML = content

  let figures = parent.querySelectorAll('figure')

  figures.forEach(figure => {
    figure.classList.add('aspect-ratio')

    let youtube_url = figure.children[0].getAttribute('url')
    let youtube_id = getYoutubeId(youtube_url)

    let iframeMarkup = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtube_id}" frameborder="0" allowfullscreen></iframe>`;

    figure.innerHTML = iframeMarkup
  })

  let result = parent.innerHTML

  return result.replaceAll('<figure', '<div').replaceAll('</figure>', '</div>')
}