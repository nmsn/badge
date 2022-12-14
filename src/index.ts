import inquirer from 'inquirer';
import chalk from 'chalk';
import type { BaseBadgeType } from './constant';
import { baseBadges } from './constant';
import { makeBadge } from './utils';

const prompts = [
  {
    type: 'checkbox',
    name: 'badges',
    message: 'Select the option what you want to generate a badge?',
    pageSize: 10,
    choices: baseBadges.map((item) => ({
      name: `${item.title} ${chalk.hex(item.backgroundColor).inverse(' C ')}`,
      value: item.title,
    })),
  },
  {
    type: 'list',
    name: 'tagType',
    message: 'Select the type of output',
    choices: [
      { value: 'md', name: 'markdown-tag' },
      { value: 'img', name: 'html-img' },
    ].map((item) => ({
      name: item.name,
      value: item.value,
    })),
  },
  {
    type: 'input',
    name: 'fileName',
    message: 'Enter a name for the save file',
    default: 'BADGE',
  },
];

const filterSelectedBadge = (badges: BaseBadgeType[], badgeTitles: string[]) => {
  return badges.filter((item) => badgeTitles.includes(item.title));
};

export default async () => {
  const { badges, fileName, tagType } = await inquirer.prompt(prompts);

  const selectedBadges = filterSelectedBadge(baseBadges, badges);

  makeBadge(selectedBadges, fileName, tagType);
};
