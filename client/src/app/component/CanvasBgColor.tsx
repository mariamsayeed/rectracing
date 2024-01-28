'use client';
import * as React from 'react';
import clsx from 'clsx';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList, TabsListProps } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel, TabPanelProps } from '@mui/base/TabPanel';
import { Tab as BaseTab, TabProps } from '@mui/base/Tab';
import { useTheme } from '@mui/system';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';
// import config from '../../tailwind.config';

declare module '@mui/system' {
    interface CustomThemeConfig {
        extend?: Partial<CustomThemeConfig>;
    }
}

function useIsDarkMode() {
    const theme = useTheme();
    return theme.palette.mode === 'dark';
}

export default function CanvasBgColor() {
    const isDarkMode = useIsDarkMode();
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: any, newValue: string | number | null) => {
        if (typeof newValue === 'number') {
            setValue(newValue);
        }
    };

    const fullConfig = resolveConfig(tailwindConfig);

    const backgroundColors = [
    fullConfig.theme.colors['white'],
    fullConfig.theme.colors['purple'],
    fullConfig.theme.colors['blue'],
    fullConfig.theme.colors['pink'],
  ];
  const backgroundColor = backgroundColors[value].toString();
  console.log(backgroundColor);
  const bodyClassName = `bg-[${backgroundColor}]`;
  React.useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    return () => {
      document.body.style.backgroundColor = '';
    };
  });
  // const root = window.document.documentElement;
  // root.classList.add(bodyClassName);

  return (
    <div  style={{ position: 'absolute', bottom: 0, left: 0 }}>
      <Tabs value={value} onChange={handleChange}>
        <TabsList>
       
        <Tab value={0} style={value === 0 ? { color: 'black' } : {}}>white</Tab>
          <Tab value={1} style={value === 1 ? { color: 'purple' } : {}}>purple</Tab>
          <Tab value={2} style={value === 2 ? { color: 'blue' } : {}}>blue</Tab>
          <Tab value={3} style={value === 3 ? { color: 'pink' } : {}}>pink</Tab>
        </TabsList>
      </Tabs>
    </div>
  );
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseTabsList
      ref={ref}
      className={clsx(
        'mb-4 rounded-xl bg-text3-500 flex font-sans items-center justify-center content-between min-w-tabs-list shadow-lg',
        className,
      )}
      {...other}
    />
  );
});
TabsList.displayName = 'TabsList';

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  return (
    <BaseTab
      ref={ref}
      {...props}
      onClick={() => console.log('Tab clicked')}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `font-sans ${
                ownerState.selected
                  ? 'text-purple-500 bg-white'
                  : 'text-white bg-transparent focus:text-white hover:bg-purple-400'
              } ${
                ownerState.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              } text-xs leading-[1.2] font-semibold w-16 py-1 px-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});
Tab.displayName = 'Tab';
const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseTabPanel
      ref={ref}
      className={clsx(
        'py-5 px-3 bg- dark:bg-black-900 border border-solid border-slate-200 dark:border-slate-700 rounded-xl opacity-60 w-full font-sans text-sm',
        className,
      )}
      {...other}
    />
  );
});
TabPanel.displayName = 'TabPanel';
