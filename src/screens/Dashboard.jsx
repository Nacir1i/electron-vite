import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { SVGRenderer } from "echarts/renderers";
import { PieChart, LineChart, BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent, DatasetComponent } from "echarts/components";

echarts.use([GridComponent, TooltipComponent, LegendComponent, DatasetComponent, PieChart, LineChart, BarChart, SVGRenderer])

const StatAppointments = () => {
  const statistic_options = {
    tooltip: {
      show: true,
    },
    legend: {
      show: true,
      left: 'left',
      top: 'center',
      orient: 'vertical',
    },
    series: [
      {
        type: 'pie',
        center: ['75%', '37.5%'],
        width: 'auto',
        height: '125%',
        name: 'Nominations',
        radius: ['37.5%', '65%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 3
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        color: [
          "#003432",
          "#bcd3d1",
          "#7b969c",
        ],
        data: [
          { value: 60, name: 'Nouveau' },
          { value: 25, name: 'Retour' },
          { value: 15, name: 'Inactif' }
        ]
      }
    ]
  }
  return (
    <div className="w-full h-fit bg-secondary border border-weakest-contrast rounded-2xl p-4 font-roboto flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h5 className="text-sm font-medium text-gray-600">Appointments</h5>
        <h2 className="text-2xl font-bold text-strong-contrast">350</h2>
      </div>
      <div className="w-full flex-1">
        <ReactEChartsCore
          echarts={echarts}
          notMerge={true}
          lazyUpdate={false}
          option={statistic_options}
          style={{ width: "100%", height: "120px" }}
        />
      </div>
    </div>
  );
}

const StatClients = () => {
  const statistic_options = {
    tooltip: {
      show: true,
    },
    legend: {
      show: true,
      left: 'left',
      top: 'center',
      orient: 'vertical',
    },
    series: [
      {
        type: 'pie',
        center: ['75%', '37.5%'],
        width: 'auto',
        height: '125%',
        name: 'Clients',
        radius: ['37.5%', '65%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 3
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        color: [
          "#003432",
          "#bcd3d1",
        ],
        data: [
          { value: 40, name: 'Payé' },
          { value: 60, name: 'Essai' }
        ]
      }
    ]
  }
  return (
    <div className="w-full h-fit bg-secondary border border-weakest-contrast rounded-2xl p-4 font-roboto flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h5 className="text-sm font-medium text-gray-600">Clients</h5>
        <h2 className="text-2xl font-bold text-strong-contrast">239</h2>
      </div>
      <div className="w-full flex-1">
        <ReactEChartsCore
          echarts={echarts}
          notMerge={true}
          lazyUpdate={false}
          option={statistic_options}
          style={{ width: "100%", height: "120px" }}
        />
      </div>
    </div>
  );
}

const DashboardCards = () => {
  const DashboardCard = ({ name, value, highlight }) => {
    const className = !highlight ? "text-base text-strong-contrast font-inter font-semibold" : "text-base text-highlight font-inter font-bold"
    return (
      <div className="w-full h-full justify-around flex flex-col gap-2 bg-secondary border border-weakest-contrast rounded-2xl p-4">
        <h1 className="text-sm font-inter text-strong-contrast">{name}</h1>
        <h3 className={className}>{value} <span className="text-sm">MAD</span></h3>
      </div>
    );
  }
  const cards = [
    ["Revenu", "22500.00", false],
    ["Charges", "22500.00", false],
    ["Bénéfice", "22500.00", false],
    ["Solde impayé", "22500.00", true],
    ["Avance versée", "22500.00", true],
    ["Le reste", "22500.00", true],
  ];
  const CardCollection = () => cards.map(([name, value, highlight], index) => <DashboardCard key={index} name={name} value={value} highlight={highlight} />)
  return (
    <div className="w-full h-full font-roboto col-span-2 grid grid-cols-3 grid-rows-2 gap-4">
      <CardCollection />
    </div>
  )
}

const StatUserAcq = () => {
  const statistic_options = {
    tooltip: {
      show: true,
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '7.5%',
      bottom: '15%',
    },
    series: [
      {
        name: "Les ventes",
        data: [120, 200, 150, 80, 70, 110, 130, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle: {
          borderRadius: 16,
          borderColor: '#fff',
          borderWidth: 0,
        },
        showBackground: true,
        backgroundStyle: {
          borderRadius: 16,
          color: 'rgba(180, 180, 180, 0.4)'
        },
        barWidth: 10,
        color: [
          {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0, color: '#003432' // color at 0%
            }, {
              offset: 1, color: 'rgba(0, 52, 50, 0.5)' // color at 100%
            }],
            global: false // default is false
          }
        ]
      }
    ]
  }
  return (
    <div className="col-span-2 grid-span-1 w-full h-full bg-secondary border border-weakest-contrast rounded-2xl p-4 font-roboto flex flex-col gap-2">
      <h5 className="text-sm font-medium text-gray-600">Les ventes</h5>
      <hr />
      <ReactEChartsCore
        echarts={echarts}
        notMerge={true}
        lazyUpdate={false}
        option={statistic_options}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

const StatRevenue = () => {
  const statistic_options = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '7.5%',
      bottom: '15%',
    },
    tooltip: {
      show: true,
    },
    series: [
      {
        name: "Chronologie des revenus",
        data: [0, 36, 28, 79, 66, 25, 130, 150, 80, 70, 110, 130],
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 5,
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0, color: '#003432' // color at 0%
            }, {
              offset: 1, color: 'rgba(0, 52, 50, 0.5)' // color at 100%
            }],
            global: false // default is false
          },
          cap: 'round',
          join: 'round',
        },
        showBackground: true,
        backgroundStyle: {
          borderRadius: 16,
          color: 'rgba(180, 180, 180, 0.4)'
        },
        barWidth: 12,
        color: [
          {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0, color: '#003432' // color at 0%
            }, {
              offset: 1, color: 'rgba(0, 52, 50, 0.5)' // color at 100%
            }],
            global: false // default is false
          }
        ]
      }
    ]
  }
  return (
    <div className="col-span-2 grid-span-1 w-full h-full bg-secondary border border-weakest-contrast rounded-2xl p-4 font-roboto flex flex-col gap-2">
      <h5 className="text-sm font-medium text-gray-600">Chronologie des revenus</h5>
      <hr />
      <ReactEChartsCore
        echarts={echarts}
        notMerge={true}
        lazyUpdate={false}
        option={statistic_options}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

const Dashboard = () => {
  return (
    <div className="w-full h-full bg-primary flex flex-col gap-2 p-2">
      <div className="w-full">
        <h1 className="font-asap font-medium text-gray-600">Période</h1>
      </div>
      <div className="flex-[3_3_0%] height w-full grid gap-4" style={{ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2,  1fr)" }}>
        <StatAppointments />
        <StatClients />
        <DashboardCards />
        <StatUserAcq />
        <StatRevenue />
      </div>
      <div className="flex-[2_2_0%] w-full flex gap-4">
        <div className="flex-[2_2_0%] h-full rounded-2xl p-4 flex flex-col gap-4 border border-weakest-contrast">
          <h1 className="text-strong-contrast font-inter font-medium text-sm">Les plus grands générateurs de revenus</h1>
          <hr />
          <ul className="flex flex-col gap-2">
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Tesla</h2>
              <h4 className="font-bold font-inter">$5.4m</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">McDonald's</h2>
              <h4 className="font-bold font-inter">$2.3m</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">AARP</h2>
              <h4 className="font-bold font-inter">$800k</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Prime Therapeutics</h2>
              <h4 className="font-bold font-inter">$200k</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Disney</h2>
              <h4 className="font-bold font-inter">$16k</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">GM</h2>
              <h4 className="font-bold font-inter">$10k</h4>
            </li>
          </ul>
        </div>
        <div className="flex-1 h-full rounded-2xl p-4 flex flex-col gap-4 border border-weakest-contrast">
          <h1 className="text-strong-contrast font-inter font-medium text-sm">Packages les plus vendus</h1>
          <hr />
          <ul className="flex flex-col gap-2">
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Mariage</h2>
              <h4 className="font-bold font-inter">283</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Anniversaire</h2>
              <h4 className="font-bold font-inter">782</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Baby Shower</h2>
              <h4 className="font-bold font-inter">1,923</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Opening Ceremony</h2>
              <h4 className="font-bold font-inter">103</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Engagement Party</h2>
              <h4 className="font-bold font-inter">477</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Event / Festival</h2>
              <h4 className="font-bold font-inter">280</h4>
            </li>
          </ul>
        </div>
        <div className="flex-1 h-full rounded-2xl p-4 flex flex-col gap-4 border border-weakest-contrast">
          <h1 className="text-strong-contrast font-inter font-medium text-sm">Top fournisseurs</h1>
          <hr />
          <ul className="flex flex-col gap-2">
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Atkado</h2>
              <h4 className="font-bold font-inter">1000</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">La Belle Vie</h2>
              <h4 className="font-bold font-inter">322</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Marjane</h2>
              <h4 className="font-bold font-inter">16</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Moul Djaj 1</h2>
              <h4 className="font-bold font-inter">792</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Moul Hout 1</h2>
              <h4 className="font-bold font-inter">316</h4>
            </li>
            <li className="flex justify-between items-center text-strong-contrast">
              <h2 className="font-inter text-sm text-gray-500">Reinforcements</h2>
              <h4 className="font-bold font-inter">19</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;