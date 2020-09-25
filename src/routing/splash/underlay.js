import React, {Component} from 'react'
import {scaleSequentialLog} from 'd3-scale'
import {extent, range} from 'd3-array'
import {select} from 'd3-selection'
import {geoPath} from 'd3-geo'
import {contours} from 'd3-contour'
import {interpolateMagma} from 'd3-scale-chromatic'

class Underlay extends Component {

    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }

    componentDidMount() {
        this.createBarChart()
    }

    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {
        const {width, height, points} = this.props
        const thresholds = range(1, 40).map(i => Math.pow(1.2, i))
        const logisticCurve = (x) => {
            return 1200 / (1 + Math.exp(-.001 * (x - 600)))
        }
        //const thresholds = range(1, 1200).map(i => logisticCurve(i))


        const value = (x, y) => {
            let total = 0
            points.forEach(point => {
                let distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2)
                if (distance < 0.1) {
                    distance = 0.1
                }
                total += 1 / (distance ^ 2) * point.q * 10000
            })
            return total
        }

        const q = 5; // The level of detail, e.g., sample every 4 pixels in x and y.
        const x0 = -q / 2, x1 = width + q;
        const y0 = -q / 2, y1 = height + q;
        const n = Math.ceil((x1 - x0) / q);
        const m = Math.ceil((y1 - y0) / q);
        const grid = new Array(n * m);
        for (let j = 0; j < m; ++j) {
            for (let i = 0; i < n; ++i) {
                grid[j * n + i] = value(i * q + x0, j * q + y0);
            }
        }
        grid.x = -q;
        grid.y = -q;
        grid.k = q;
        grid.n = n;
        grid.m = m;

        const transform = ({type, value, coordinates}) => {
            return {
                type, value, coordinates: coordinates.map(rings => {
                    return rings.map(points => {
                        return points.map(([x, y]) => ([
                            grid.x + grid.k * x,
                            grid.y + grid.k * y
                        ]));
                    });
                })
            };
        }
        const _contours = contours()
            .size([grid.n, grid.m])
            .thresholds(thresholds)
            (grid)
            .map(transform)
        const node = this.node
        const svg = select(node);
        svg.selectAll('*').remove();

        svg.append("g")
            .attr("fill", "none")
            .selectAll("path")
            .data(_contours)
            .join("path")
            .attr("fill", (d, i) => i % 2 ? '#F5F2D0' : '#000000')
            .attr("d", geoPath());
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", '#000000')
            .attr("fill-opacity", .6)
    }


    render() {
        return <svg ref={node => this.node = node} height={this.props.height} width={this.props.width}
                    style={{overflow: 'hidden'}}/>
    }
}


export default Underlay

const Wrapper = (props) => {
    let {width, height} = props
    width*=.5
    height*=.5
    const [points, setPoints] = React.useState([{
        x: Math.random() * width+.5*width,
        y: Math.random() * height+.5*height,
        q: 1
    }, {x: Math.random() * width+.5*width, y: Math.random() * height+.5*height, q: 3}, {
        x: Math.random() * width+.5*width,
        y: Math.random() * height+.5*height,
        q: 2
    }])
    const incrementPoints = () => {
        setPoints(points.map(point => {
            let x = point.x + (Math.random() - .5) * .01 * width
            let y = point.y + (Math.random() - .5) * .01 * height
            if (x < 0) {
                x = 0
            }
            if (x > width) {
                x = width
            }
            if (y < 0) {
                y = 0
            }
            if (y > height) {
                y = height
            }
            return {x, y, q: point.q}
        }))
    }
    React.useEffect(() => {
        const interval = setInterval(incrementPoints, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <Underlay {...props} points={points}/>
    )
}

export {Wrapper}