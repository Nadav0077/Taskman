import { Component } from 'react';
import { Doughnut  } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { utilService } from '../../services/generalService/utilService'

// import { add, loadBoard, update, setBoard, remove } from '../store/actions/boardsAction.js';



class _ChartLabelsTasks extends Component {
    state = {
        tasks: null,
        labels: null
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            tasks: this.props.tasks,
            labels: this.props.labelsBoard
        })
    }

    mapLabelsTask = (labels, tasks) => {

        const mapObj = {};
        if (labels && tasks) {
            labels.forEach(label => {
                mapObj[`${label.title}`] = 0;
                console.log(mapObj);
                tasks.forEach(task => {
                    if (task.labelIds) {
                        task.labelIds.forEach(labelId => {
                            if (labelId === label.id) {
                                mapObj[`${label.title}`]++;
                            }
                        })
                    }
                })
            });
            return mapObj;
        }

    }

    render() {
        const { tasks, labels } = this.state;
        if (!tasks || !labels) return <h1>Loading...</h1>
        const mapLabelsTask = this.mapLabelsTask(labels, tasks);
        const backgroundColorDashboard = [];
        const backgroundColorBorder = [];

        labels.forEach(label => {
            backgroundColorDashboard.push(label.color);
        })
        const data = {
            labels: Object.keys(mapLabelsTask),
            datasets: [
                {
                    label: 'Task per Member',
                    data: Object.values(mapLabelsTask),

                    backgroundColor: backgroundColorDashboard,
                    borderColor: [
                        '#95a5a6',
                    ],
                    borderWidth: 0.5,
                },
            ],
        };
        return (
            <div className="category-chart">
                <Doughnut  data={data} width={70} height={50} options={{
                    maintainAspectRatio: false
                }} />
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
export const ChartLabelsTasks = connect(mapStateToProps, mapDispatchToProps)(_ChartLabelsTasks)