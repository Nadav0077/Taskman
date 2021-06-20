// import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import { ModalAction } from '../../shared/ModalAction';
// import { AiOutlineClose } from 'react-icons/ai'
// import { Link } from 'react-router-dom';
// import { BsCalendar } from 'react-icons/bs'
// import { BiBarChartAlt2 } from 'react-icons/bi'
// import { RiDashboardLine } from 'react-icons/ri'





// class _InfoBoardModal extends Component {

//     render() {
//         const { board } = this.props;
//         return <div className="action-modal info-board-wrap-modal d-none p-abs flex">
//             <ModalAction>
//                 <div className="info-board-modal p-abs flex column center bg-white c-stand z-1 br-3 h-50">
//                     <span className="cur-pointer fam-1 font-m bold flex w-100 content-end" onClick={() => { this.props.toggleModal() }}><AiOutlineClose /></span>
//                     <div className="action-content font-m ">
//                         <ul className="flex column h-100 w-100">
//                             <li
//                                 onClick={() => { this.props.changeDisplay('board') }}>
//                                 <RiDashboardLine />Board
//                             </li>
//                             <li 
//                                 onClick={() => { this.props.changeDisplay('dashboard') }}>
//                                 <BiBarChartAlt2 />Dashboard
//                             </li>
//                             <li
//                                 onClick={() => { this.props.changeDisplay('calendar') }}>
//                                  <BsCalendar /> Calender</li>
//                         </ul>
//                     </div>
//                 </div>
//             </ModalAction>
//         </div>
//     }


// }
// const mapStateToProps = state => {
//     return {
//         loggedInUser: state.userModule.loggedInUser,
//         board: state.boardModule.board
//     }
// }
// const mapDispatchToProps = {

// }


// export const InfoBoardModal = connect(mapStateToProps, mapDispatchToProps)(_InfoBoardModal)