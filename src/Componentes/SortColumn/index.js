import { SortIcon } from '../../styles/styles'
import { Component, React } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { CgArrowsScrollV } from 'react-icons/cg'
export default class SortColumn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      descending: false,
      arrowVisible: false
    }
    this.props.receiver(this.wipe.bind(this))
  }

  wipe (code) {
    if (code !== this.code) {
      this.setState({
        arrowVisible: false,
        descending: false
      })
    }
  }

  async reorder () {
    this.code = Math.random()
    this.props.wipeAll(this.code)
    await this.props.sortCallback({ sort: this.props.attribute, isDesc: this.state.descending })
    if (!this.state.arrowVisible) {
      this.setState({
        arrowVisible: true
      })
    }
    this.setState({
      descending: !this.state.descending
    })
  }

  render () {
    return <SortIcon onClick={this.reorder.bind(this)}>
         {this.props.label}
         {this.state.arrowVisible
           ? (this.state.descending ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />)
           : <CgArrowsScrollV />}
      </SortIcon>
  }
}
