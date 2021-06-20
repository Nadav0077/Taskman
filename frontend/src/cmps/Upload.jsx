import { Component } from 'react'
import { cloudinaryService } from '../services/generalService/cloudinaryService'
import { BsImage } from 'react-icons/bs'
import { remove, add, loadBoard, update } from '../store/actions/boardsAction.js'
import { connect } from 'react-redux'
import {boardService} from '../services/boardService.js'


class _Upload extends Component {
  state = {
    imgUrl: null,
    minHeight: 300,
    maxHeight: 200,
    height: 'auto',
    width: 200,
    isUploading: false
  }

  uploadImg = async (ev) => {
    this.setState({ isUploading: true })
    const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
    this.setState({ isUploading: false, imgUrl: secure_url, height, width },()=> {this.props.addImgToTask(this.state.imgUrl)})
  }
  get uploadMsg() {
    const { imgUrl, isUploading } = this.state
    if (imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }
  render() {
    const { imgUrl, width, height } = this.state
    const previewStyle = {
      backgroundImage: `url(${imgUrl})`,
      width,
      height
    }
    return (
      <div>
        <label className="btn-action" htmlFor="imgUpload"><BsImage className="action-icon" />Image</label>
        <input hidden type="file" onChange={ this.uploadImg } accept="img/*" id="imgUpload" />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
      loggedInUser: state.userModule.loggedInUser,
      board: state.boardModule.board
  }
}
const mapDispatchToProps = {
  remove,
  add,
  loadBoard,
  update
}
export const Upload = connect(mapStateToProps, mapDispatchToProps)(_Upload)