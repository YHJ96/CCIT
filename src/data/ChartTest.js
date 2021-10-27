export function dataFunction(mapping) {
    const data = {
        datasets: mapping.map((item, index)=>{
            return {
                lineTension: 0.3,
                label: `Value${index + 1}`,
                data: [{ x: `${item.userId + index}`, y: item.id}],
                parsing: {
                    xAxisKey: 'x',
                    yAxisKey: 'y',
                }
            }
        })
    }
    return data;
}