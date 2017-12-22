// import ajax from '../util/ajax'
import axios from 'axios'

export default {
  FETCH_ITEM_BY_ID: ({ commit, dispatch, state }, { id }) => {
    // console.log('id:' + id)
    return new Promise(function (resolve, reject) {
      axios.get('http://vue.gdzrch.win:8081/detail/' + id)
        .then(function (response) {
          var pkg = response.data.Package
          var screens = pkg.ScreenshotList.screenshot
          var item = {
            uploadTime: pkg.upload_time,
            // downloadUrl: xml.getContent(json.root, ['download_url']),
            size: pkg.size,
            score: pkg.score,
            introduction: pkg.introduction,
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
    // console.log('keyword:' + keyword + ';page:' + page)
    return new Promise(function (resolve, reject) {
      axios.get('http://vue.gdzrch.win:8081/list/' + keyword + '/' + page)
        .then(function (response) {
          var packages = response.data.PackageList.Package
          var maxpage = response.data.PackageList.maxpage
          var results = []
          packages.forEach(pkg => {
            results.push({
              'id': pkg.id,
              'title': pkg.title_zh,
              'name': pkg.developer,
              'package': pkg.package_name,
              'icon': pkg.icon_url,
              'downloadCount': pkg.downloadCountSafe,
              'downloadUrl': pkg.download_url,
              'version': pkg.version_name
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
