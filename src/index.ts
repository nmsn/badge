import inquirer from 'inquirer';
import chalk from 'chalk';
import type { BaseBadgeType } from './constant.js';
import { baseBadges } from './constant.js';
import { makeBadge } from './utils.js';

type AnswersType = {
  isAll: boolean;
  badges: string[];
  tagType: 'md' | 'img';
  fileName: string;
};

const prompts = [
  {
    type: 'confirm',
    name: 'isAll',
    message: 'Whether to generate all badges?',
    default: true,
  },
  {
    type: 'checkbox',
    name: 'badges',
    message: 'Select the option what you want to generate a badge?',
    pageSize: 10,
    when: (answers: AnswersType) => !answers.isAll,
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

const filterSelectedBadge = (badges: BaseBadgeType[], badgeTitles?: string[]) => {
  if (Array.isArray(badgeTitles) && badgeTitles.length) {
    return badges.filter((item) => badgeTitles.includes(item.title));
  }

  return badges;
};

export default async () => {
  const { isAll, badges, fileName, tagType } = await inquirer.prompt(prompts);

  const selectedBadges = filterSelectedBadge(baseBadges, isAll ? undefined : badges);

  makeBadge(selectedBadges, fileName, tagType);
};
