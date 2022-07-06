import { h } from '../../lib/guide-mini-vue.esm.js'

// export const App = {
//   // 必须要写 render
//   render() {
//     // ui
//     return h(
//       'div',
//       {
//         id: 'qwe',
//         hard: '123'
//       },
//       'hi'
//     )
//   },

//   setup() {
//     return {
//       msg: 'mini-vue'
//     }
//   }
// }

export const App = {
  // 必须要写 render
  render() {
    // ui
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
        onClick() {
          console.log('click')
        },
        onMousedown() {
          console.log('mousedown')
        }
      },
      'hi, ' + this.msg
    )
  },

  setup() {
    return {
      msg: 'mini-vue1'
    }
  }
}
