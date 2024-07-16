import { ROLES } from '@/config/constants';
import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

export const users = [
  {
    id: 1,
    role: ROLES.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
  {
    id: 2,
    role: ROLES.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
  {
    id: 3,
    role: ROLES.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
  {
    id: 4,
    role: ROLES.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
  {
    id: 5,
    role: ROLES.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
  {
    id: 6,
    role: ROLES.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
];

export const rolesList = [
  {
    name: ROLES.Administrator,
    color: '#2465FF',
    users: 3,
  },
  {
    name: ROLES.Manager,
    color: '#F5A623',
    users: 3,
  },
  {
    name: ROLES.Sales,
    color: '#FF1A1A',
    users: 3,
  },
  {
    name: ROLES.Support,
    color: '#8A63D2',
    users: 3,
  },
  {
    name: ROLES.Developer,
    color: '#FF1A1A',
    users: 3,
  },
  {
    name: ROLES.HRD,
    color: '#11A849',
    users: 3,
  },
  {
    name: ROLES.RestrictedUser,
    color: '#4E36F5',
    users: 3,
  },
  {
    name: ROLES.Customer,
    color: '#0070F3',
    users: 3,
  },
];

export const roleActions = [
  {
    id: 1,
    name: 'Add User',
  },
  {
    id: 2,
    name: 'Rename',
  },
  {
    id: 3,
    name: 'Remove Role',
  },
];
