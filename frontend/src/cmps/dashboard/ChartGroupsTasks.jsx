import { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { utilService } from '../../services/generalService/utilService';


// import { add, loadBoard, update, setBoard, remove } from '../store/actions/boardsAction.js';



class _ChartGroupsTasks extends Component {
    state = {
        tasks: null,
        groups: null
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            tasks: this.props.tasks,
            groups: this.props.groups
        })
    }

    mapGroupTask = (groups, tasks) => {

        const mapObj = {};
        if (groups && tasks) {
            groups.forEach(group => {
                mapObj[`${group.title}`] = group.tasks.length;
            });
            return mapObj;
        }
    }

    render() {
        const { tasks, groups } = this.state;
        if (!tasks || !groups) return <h1>Loading...</h1>
        const mapGroupTask = this.mapGroupTask(groups, tasks);
        const backgroundColor = [];
        const borderColor = [];

        utilService.randColor(Object.keys(mapGroupTask).length).forEach(color => {
            backgroundColor.push(color[0]);
            borderColor.push(color[1]);
        });
        const data = {
            labels: Object.keys(mapGroupTask),
            datasets: [
                {
                    label: 'Task per Member',
                    data: Object.values(mapGroupTask),
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                },
            ],
        };
        const option = {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }
        return (
            <div className="category-chart">
                <Pie data={data} width={70} height={50}
                    options={option}
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
export const ChartGroupsTasks = connect(mapStateToProps, mapDispatchToProps)(_ChartGroupsTasks)