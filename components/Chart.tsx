import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface I_ChartData {
    label: string;
    labels: string[];
    data: number[];
    color?: string; // Garis
    gradient?: string; // Gradien bawah
    unit?: string; // Misalnya "Rp" atau "$"
}

interface I_Props {
    chart: I_ChartData;
    height?: number;
}

export function CE_Chart(props: I_Props) {
    const screenWidth = Dimensions.get("window").width;
    const { chart, height = 220 } = props;

    const lineColor = chart.color ?? "#2563eb";
    const gradientColor = chart.gradient ?? "#dbeafe";

    const data = {
        labels: chart.labels,
        datasets: [
            {
                data: chart.data,
                strokeWidth: 2,
                color: () => lineColor,
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 0,
        color: () => lineColor,
        labelColor: () => "#6b7280", // Abu
        propsForDots: {
        r: "4",
        strokeWidth: "2",
            stroke: lineColor,
        },
        propsForBackgroundLines: {
            stroke: "#f3f4f6", // garis halus background
        },
        fillShadowGradient: gradientColor,
        fillShadowGradientOpacity: 1,
        style: {
            paddingTop: 28,
        },
    };

    return (
        <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">{chart.label}</Text>

            <LineChart
                data={data}
                width={screenWidth - 32}
                height={height}
                chartConfig={chartConfig}
                bezier
                withDots
                withInnerLines={false}
                withOuterLines={false}
                style={{ 
                    paddingTop: 12,
                    borderRadius: 12 
                }}
            />
        </View>
    );
}
