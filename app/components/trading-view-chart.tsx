"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { GraphicComponentOption } from "echarts";

interface chartDataType {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

const TradingViewChart = () => {
    const [chartData, setChartData] = useState<chartDataType[]>([]);
    const [selectedInterval, setSelectedInterval] = useState<string>("1D");
    const [annotations, setAnnotations] = useState<GraphicComponentOption[]>([]);
    const [drawingMode, setDrawingMode] = useState<string | null>(null);

    const getChartData = useCallback(async () => {
        const { data } = await axios.get(`/api/candlestick?interval=${selectedInterval}`);
        setChartData(data);
    }, [selectedInterval]);

    const fetchNewChartData = useCallback(async () => {
        const open = Math.random() * 100;
        const close = open + (Math.random() - 0.5) * 10;
        const high = Math.max(open, close) + Math.random() * 5;
        const low = Math.min(open, close) - Math.random() * 5;
        const timestamp = Date.now();

        setChartData((prev: chartDataType[]) => [...prev, { time: timestamp, open, high, low, close }]);
    }, []);

    const dateFormatter = (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    useEffect(() => {
        getChartData();
    }, [getChartData]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchNewChartData();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [fetchNewChartData]);

    return (
        <div>
            <div className="flex items-center justify-between gap-4 py-5">
                <h1>Trading view chart</h1>

                <div>
                    <label>Time interval: </label>
                    <select onChange={(e) => setSelectedInterval(e.target.value)} className="bg-white text-black border-2 border-black rounded-md p-3 py-1">
                        <option value="1D">Day</option>
                        <option value="1W">Week</option>
                        <option value="1M">Month</option>
                    </select>
                </div>
            </div>
            <ReactECharts
                option={{
                    title: {
                        text: "AAPL",
                        left: 0,
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross",
                        },
                    },
                    grid: {
                        left: "10%",
                        right: "10%",
                        bottom: "15%",
                    },
                    dataZoom: [
                        {
                            type: "inside",
                            start: 50,
                            end: 100,
                        },
                        {
                            show: true,
                            type: "slider",
                            top: "90%",
                            start: 50,
                            end: 100,
                        },
                    ],
                    xAxis: {
                        type: "category",
                        data: chartData?.map((item: chartDataType) => dateFormatter(item.time)),
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        splitLine: { show: false },
                        min: "dataMin",
                        max: "dataMax",
                    },
                    yAxis: {
                        scale: true,
                        splitArea: {
                            show: true,
                        },
                    },
                    series: [
                        {
                            name: "AAPL",
                            type: "candlestick",
                            data: chartData?.map((item: chartDataType) => [item.open, item.close, item.low, item.high]),
                            itemStyle: {
                                color: "#06B800",
                                color0: "#FF0000",
                                borderColor: "#06B800",
                                borderColor0: "#FF0000",
                            },
                            // markPoint: {
                            //     label: {
                            //         formatter: function (param: { value: number } | null) {
                            //             return param != null ? Math.round(param.value) + "" : "";
                            //         },
                            //     },
                            //     data: [
                            //         {
                            //             name: "Mark",
                            //             coord: ["2013/5/31", 2300],
                            //             value: 2300,
                            //             itemStyle: {
                            //                 color: "rgb(41,60,85)",
                            //             },
                            //         },
                            //         {
                            //             name: "highest value",
                            //             type: "max",
                            //             valueDim: "highest",
                            //         },
                            //         {
                            //             name: "lowest value",
                            //             type: "min",
                            //             valueDim: "lowest",
                            //         },
                            //         {
                            //             name: "average value on close",
                            //             type: "average",
                            //             valueDim: "close",
                            //         },
                            //     ],
                            //     tooltip: {
                            //         formatter: function (param: { name: string; data: { coord: string } }) {
                            //             return param.name + "<br>" + (param.data.coord || "");
                            //         },
                            //     },
                            // },
                            // markLine: {
                            //     symbol: ["none", "none"],
                            //     data: [
                            //         [
                            //             {
                            //                 name: "from lowest to highest",
                            //                 type: "min",
                            //                 valueDim: "lowest",
                            //                 symbol: "circle",
                            //                 symbolSize: 10,
                            //                 label: {
                            //                     show: false,
                            //                 },
                            //                 emphasis: {
                            //                     label: {
                            //                         show: false,
                            //                     },
                            //                 },
                            //             },
                            //             {
                            //                 type: "max",
                            //                 valueDim: "highest",
                            //                 symbol: "circle",
                            //                 symbolSize: 10,
                            //                 label: {
                            //                     show: false,
                            //                 },
                            //                 emphasis: {
                            //                     label: {
                            //                         show: false,
                            //                     },
                            //                 },
                            //             },
                            //         ],
                            //         {
                            //             name: "min line on close",
                            //             type: "min",
                            //             valueDim: "close",
                            //         },
                            //         {
                            //             name: "max line on close",
                            //             type: "max",
                            //             valueDim: "close",
                            //         },
                            //     ],
                            // },
                        },
                    ],
                    toolbox: {
                        feature: {
                            myTool: {
                                show: true,
                                title: "Draw",
                                icon: "path://M512 128c-128 0-128 128-128 128s128 128 128 128 128-128 128-128-128-128-128-128zM512 256c-64 0-64 64-64 64s64 64 64 64 64-64 64-64-64-64-64-64z",
                                onclick: () => setDrawingMode(drawingMode ? null : "line"),
                            },
                        },
                        right: 100,
                    },
                    graphic: annotations,
                }}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: "500px", minHeight: "500px", width: "100%" }}
                opts={{ renderer: "svg" }}
                onEvents={{
                    click: (params: { componentType: string; seriesType: string; seriesIndex: number; event: { offsetX: number; offsetY: number } }) => {
                        if (drawingMode === "line" && params.seriesIndex === 0) {
                            const { offsetX, offsetY } = params.event;
                            const newAnnotation = {
                                type: "line",
                                shape: {
                                    x1: offsetX - 50,
                                    y1: offsetY,
                                    x2: offsetX + 50,
                                    y2: offsetY,
                                },
                                style: {
                                    stroke: "#ff0000",
                                    lineWidth: 2,
                                },
                            };

                            setAnnotations((prev: GraphicComponentOption[]) => [...prev, newAnnotation]);
                        } else if (params.componentType === "series" && params.seriesType === "candlestick") {
                            const x = params.event.offsetX;
                            const y = params.event.offsetY;

                            const text = prompt("Enter your annotation:");
                            if (text) {
                                setAnnotations((prev: GraphicComponentOption[]) => [
                                    ...prev,
                                    {
                                        type: "text",
                                        position: [x, y],
                                        style: {
                                            text: text,
                                            fill: "blue",
                                            font: "14px Microsoft YaHei",
                                            fontWeight: "bold",
                                            zIndex: 999999,
                                        },
                                        z: 10,
                                        zLevel: 1,
                                    },
                                ]);
                            }
                        }
                    },
                }}
            />
        </div>
    );
};

export default TradingViewChart;
