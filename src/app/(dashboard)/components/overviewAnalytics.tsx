"use client";
import { Eye, GalleryHorizontalEnd, LucideIcon, User2Icon } from "lucide-react";
import NumberFlow, { type Value } from "@number-flow/react";
import { useState, useEffect, useRef } from "react";

function Box(data: AnalyticsBoxProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    setDisplayValue(data.value.value);
  }, []);

  return (
    <div className="border border-border px-4 py-6 rounded-2xl w-full bg-bgPrimary">
      <div className="flex flex-row justify-between">
        <h3 className="text-txt text-base">{data.title}</h3>
        <data.Icon />
      </div>
      <div className="flex items-center">
        {data.value.valuePrefix && (
          <span className="font-bold text-3xl">{data.value.valuePrefix}</span>
        )}
        <NumberFlow
          className="text-3xl font-bold"
          format={{ notation: "compact" }}
          title={data.value.value.toString()}
          value={displayValue}
        />
        {data.value.valueSuffix && (
          <span className="font-bold text-3xl">{data.value.valueSuffix}</span>
        )}
      </div>
      <div className="flex items-center">
        <p className="text-xs text-txtPrimary">
          {data.extra.valuePrefix && <span>{data.extra.valuePrefix}</span>}
          <NumberFlow
            value={data.extra.value}
            className="text-xs text-txtPrimary"
          />
          {data.extra.valueSuffix && <span>{data.extra.valueSuffix}</span>}
        </p>
        <span className="ml-2 text-xs text-txtPrimary">{data.extra.desc}</span>
      </div>
    </div>
  );
}

type AnalyticsBoxProps = {
  title: string;
  value: {
    value: number;
    valuePrefix?: string;
    valueSuffix?: string;
  };
  extra: {
    value: number;
    valuePrefix?: string;
    valueSuffix?: string;
    desc: string;
  };
  Icon: LucideIcon;
};

const fakeData: AnalyticsBoxProps[] = [
  {
    title: "Total Views",
    value: {
      value: 123500
    },
    extra: {
      valuePrefix: "+",
      value: 120,
      desc: "from last month"
    },
    Icon: Eye
  },
  {
    title: "Stories Created",
    value: {
      value: 12.5,
      valuePrefix: "+",
      valueSuffix: ""
    },
    extra: {
      valuePrefix: "+",
      value: 3,
      desc: "new stories this week"
    },
    Icon: GalleryHorizontalEnd
  },
  {
    title: "Engagement Rate",
    value: {
      value: 75,
      valueSuffix: "%"
    },
    extra: {
      valuePrefix: "+",
      value: 4,
      desc: "new stories this week"
    },
    Icon: User2Icon
  }
];

export default function OverviewAnalytics() {
  return (
    <div className="flex flex-row space-x-4">
      {fakeData.map((item) => (
        <Box
          key={item.title}
          title={item.title}
          value={item.value}
          extra={item.extra}
          Icon={item.Icon}
        />
      ))}
    </div>
  );
}
