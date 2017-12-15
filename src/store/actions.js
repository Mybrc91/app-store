// import ajax from '../util/ajax'
import axios from 'axios'
import xml from 'basic-xml2json'

export default {
  FETCH_ITEM_BY_ID: ({ commit, dispatch, state }, { id }) => {
    // console.log('id:' + id)
    return new Promise(function (resolve, reject) {
      axios.get('https://bird.ioliu.cn/v1?url=http://appstore.vivo.com.cn/port/package/?app_version=401&id=' +
        id +
        '&need_comment=0&content_complete=0&cs=1')
        .then(function (response) {
          // console.log(response)
          var json = xml.parse(response.data)
          // console.log(json)
          var screenList = xml.getChildNode(json.root, ['ScreenshotList'])
          // console.log(screenList)
          var screens = xml.getAllContent(screenList, ['screenshot'])
          var item = {
            uploadTime: xml.getContent(json.root, ['upload_time']),
            // downloadUrl: xml.getContent(json.root, ['download_url']),
            size: xml.getContent(json.root, ['size']),
            score: xml.getContent(json.root, ['score']),
            introduction: xml.getContent(json.root, ['introduction']),
            // downloadCount: xml.getContent(json.root, ['download_count']),
            screens: screens
          }
          resolve(item)
          // console.log(item)
        })
        .catch(function (error) {
          console.log(error)
        })
    })
  },
  FETCH_LIST_DATA: ({ commit, dispatch, state }, { keyword, page }) => {
    console.log('keyword:' + keyword + ';page:' + page)
    return new Promise(function (resolve, reject) {
      axios.get('https://bird.ioliu.cn/v1?url=http://appstore.vivo.com.cn/port/packages/?app_version=401&apps_per_page=30&page_index=' +
        page +
        '&key=' +
        keyword +
        '&model=Android%20SDK%20built%20for%20x86&imei=1234567890&cs=1&target=local')
        .then(function (response) {
          var xmlStr = response.data.slice(0, response.data.length)
          var json = xml.parse(xmlStr)
          var nodes = xml.getChildNodes(json.root, ['Package'])
          // console.log(xml.getContent(nodes[0], ['title_zh']))
          // console.log(json)
          // var ids = xml.getAllContent(json.root, [xml.ANY, 'id'])
          // console.log(ids)
          // var names = xml.getAllContent(json.root, [xml.ANY, 'developer'])
          // console.log(names)
          var maxpage = json.root.attributes.maxpage
          var results = []
          // if (ids.length === names.length) {
          //   ids.forEach(id => {
          //     results.push({'id': id})
          //   })
          //   results.forEach((result, index) => {
          //     result.name = names[index]
          //   })
          // }
          nodes.forEach(node => {
            results.push({
              'id': xml.getContent(node, ['id']),
              'title': xml.getContent(node, ['title_zh']),
              'name': xml.getContent(node, ['developer']),
              'package': xml.getContent(node, ['package_name']),
              'icon': xml.getContent(node, ['icon_url']),
              'downloadCount': xml.getContent(node, ['downloadCountSafe']),
              'downloadUrl': xml.getContent(node, ['download_url']),
              'version': xml.getContent(node, ['version_name'])
            })
          })
          // console.log('results')
          commit('SET_ITEMS', {'items': results, 'maxpage': maxpage})
          // resolve()
        })
        .catch(function (error) {
          console.log(error)
        })
    })
  }
}
