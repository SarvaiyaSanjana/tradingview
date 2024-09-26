import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const interval = request.nextUrl.searchParams.get("interval");

    const dailyData = [
        { time: 1633046400000, open: 145.0, high: 150.0, low: 144.0, close: 149.0 },
        { time: 1633132800000, open: 149.0, high: 152.0, low: 146.0, close: 150.0 },
        { time: 1633219200000, open: 150.0, high: 153.0, low: 148.0, close: 152.0 },
        { time: 1633305600000, open: 152.0, high: 155.0, low: 150.0, close: 154.0 },
        { time: 1633392000000, open: 154.0, high: 158.0, low: 153.0, close: 157.0 },
        { time: 1633478400000, open: 157.0, high: 160.0, low: 156.0, close: 159.0 },
        { time: 1633564800000, open: 159.0, high: 162.0, low: 157.0, close: 161.0 },
        { time: 1633651200000, open: 161.0, high: 165.0, low: 160.0, close: 164.0 },
        { time: 1633737600000, open: 164.0, high: 168.0, low: 162.0, close: 167.0 },
        { time: 1633824000000, open: 167.0, high: 170.0, low: 165.0, close: 169.0 },
        { time: 1633910400000, open: 169.0, high: 172.0, low: 168.0, close: 171.0 },
        { time: 1633996800000, open: 171.0, high: 174.0, low: 170.0, close: 173.0 },
        { time: 1634083200000, open: 173.0, high: 175.0, low: 171.0, close: 174.0 },
        { time: 1634169600000, open: 174.0, high: 177.0, low: 173.0, close: 176.0 },
        { time: 1634256000000, open: 176.0, high: 178.0, low: 175.0, close: 177.0 },
        { time: 1634342400000, open: 177.0, high: 180.0, low: 176.0, close: 179.0 },
        { time: 1634428800000, open: 179.0, high: 182.0, low: 178.0, close: 181.0 },
    ];

    const weeklyData = [
        { time: 1694112000000, open: 145.0, high: 150.0, low: 144.0, close: 154.0 },
        { time: 1694716800000, open: 154.0, high: 158.0, low: 150.0, close: 157.0 },
        { time: 1695321600000, open: 157.0, high: 162.0, low: 156.0, close: 160.0 },
        { time: 1695926400000, open: 160.0, high: 165.0, low: 158.0, close: 164.0 },
    ];

    const monthlyData = [
        { time: 1694112000000, open: 145.0, high: 150.0, low: 140.0, close: 154.0 },
        { time: 1696704000000, open: 154.0, high: 158.0, low: 145.0, close: 157.0 },
        { time: 1699286400000, open: 157.0, high: 160.0, low: 150.0, close: 162.0 },
    ];

    let data;
    if (interval === "1D") {
        data = dailyData;
    } else if (interval === "1W") {
        data = weeklyData;
    } else if (interval === "1M") {
        data = monthlyData;
    } else {
        return NextResponse.json({ error: "Invalid interval" }, { status: 400 });
    }

    return NextResponse.json(data);
}
