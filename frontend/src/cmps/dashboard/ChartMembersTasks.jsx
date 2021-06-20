import { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { utilService } from '../../services/generalService/utilService'

// import { add, loadBoard, update, setBoard, remove } from '../store/actions/boardsAction.js';



class _ChartMembersTasks extends Component {
    state = {
        tasks: null,
        members: null
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            tasks: this.props.tasks,
            members: this.props.membersBoard
        })
    }

    mapMembersTask = (members, tasks) => {

        const mapObj = {};
        members.forEach(member => {
            mapObj[`${member.fullname}`] = 0;
            console.log(mapObj);
            tasks.forEach(task => {
                task.members.forEach(currMember => {
                    if (currMember.fullname === member.fullname) {
                        mapObj[`${member.fullname}`]++;
                    }
                })
            })
        });
        return mapObj;

    }


    render() {
        const { tasks, members } = this.state;
        if (!tasks || !members) return <h1>Loading...</h1>
        const mapMembersTask = this.mapMembersTask(members, tasks);
        const backgroundColor = [];
        const borderColor = [];

        utilService.randColor(Object.keys(mapMembersTask).length).forEach(color => {
            backgroundColor.push(color[0]);
            borderColor.push(color[1]);
        });

        const data = {
            labels: Object.keys(mapMembersTask),
            datasets: [
                {
                    label: '',
                    data: Object.values(mapMembersTask),
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 0.5,
                },
            ],
        };

        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };



        return (
            <div className="category-chart">
                <Bar data={data} width={70} height={50} options={{
                    maintainAspectRatio: false
                }} 
                />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {

}
export const ChartMembersTasks = connect(mapStateToProps, mapDispatchToProps)(_ChartMembersTasks)