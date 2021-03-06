import { ResponsiveBar } from '@nivo/bar';

export const MyResponsiveBar = ({ data /* see data tab */ }) => (
   <ResponsiveBar
      data={data}
      keys={['porcentagem']}
      indexBy={'mes'}
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
      padding={0.8}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'category10' }}
      defs={[
         {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
         },
         {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
         }
      ]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
         tickSize: 5,
         tickPadding: 5,
         tickRotation: 0,
         legend: 'Período',
         legendPosition: 'middle',
         legendOffset: 40
      }}
      axisLeft={{
         tickSize: 5,
         tickPadding: 5,
         tickRotation: 0,
         legend: 'Taxa de Sucesso (%) – Comparecidos / Demanda Ofertada',
         legendPosition: 'middle',
         legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 5]] }}
      legends={[
         {
            dataFrom: 'keys',
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: -28,
            translateY: -35,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
               {
                  on: 'hover',
                  style: {
                     itemOpacity: 1
                  }
               }
            ]
         }
      ]}
      role="application"
      barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
   />
)