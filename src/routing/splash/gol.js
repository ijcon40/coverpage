import React from 'react';
import {scaleLinear} from '@vx/scale';
import {HeatmapRect} from '@vx/heatmap';

const cool1 = '#122549';
const cool2 = '#b4fbde';
export const background = '#28272c';


function max(data, value) {
    return Math.max(...data.map(value));
}

function min(data, value) {
    return Math.min(...data.map(value));
}

// accessors
const bins = (d) => d.bins;
const count = (d) => d.count;

// scales


const defaultMargin = {top: 10, left: 20, right: 20, bottom: 110};

export default ({
                    width,
                    height,
                    events = false,
                    margin = defaultMargin,
                    separation = 20,
    binData
                }) => {
    // bounds

    const colorMax = max(binData, d => max(bins(d), count));
const bucketSizeMax = max(binData, d => bins(d).length);

    const rectColorScale = scaleLinear({
        range: [cool1, cool2],
        domain: [0, colorMax],
    });
    const opacityScale = scaleLinear({
        range: [0.1, 1],
        domain: [0, colorMax],
    });

    const xScale = scaleLinear({
        domain: [0, binData.length],
    });
    const yScale = scaleLinear({
        domain: [0, bucketSizeMax],
    });
    const size =
        width > margin.left + margin.right ? width - margin.left - margin.right - separation : width;
    const xMax = size / 2;
    const yMax = height - margin.bottom - margin.top;

    const binWidth = xMax / binData.length;
    const binHeight = yMax / bucketSizeMax;
    const radius = min([binWidth, binHeight], d => d) / 2;

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    return width < 10 ? null : (
        <svg width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill={background}/>
            <HeatmapRect
                data={binData}
                xScale={xScale}
                yScale={yScale}
                colorScale={rectColorScale}
                opacityScale={opacityScale}
                binWidth={binWidth}
                binHeight={binWidth}
                gap={2}
            >
                {heatmap =>
                    heatmap.map(heatmapBins =>
                        heatmapBins.map(bin => (
                            <rect
                                key={`heatmap-rect-${bin.row}-${bin.column}`}
                                className="vx-heatmap-rect"
                                width={bin.width}
                                height={bin.height}
                                x={bin.x}
                                y={bin.y}
                                fill={bin.color}
                                fillOpacity={bin.opacity}
                            />
                        )),
                    )
                }
            </HeatmapRect>
        </svg>
    );
};


const Wrapper = (props)=>{
    const {width, height} = props
    const [data, setData] = React.useState()
}