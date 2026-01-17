
export interface NavItem {
  label: string;
  path: string;
}

export interface Notice {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'Educational' | 'Social' | 'General';
}

export interface Activity {
  title: string;
  description: string;
  icon: string;
}
