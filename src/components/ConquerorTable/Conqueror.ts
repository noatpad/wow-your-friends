export type Platform = 'PC' | 'Mac' | 'Linux' | 'Playstation' | 'Xbox' | 'Switch';
export type Flag = 'double' | 'nks' | 'dts' | 'meme' | 'not202' | 'pre202';
export type ProofType = 'video' | 'screenshot';

export interface NewConqueror {
  name: string,
  date: string,
  platform: Platform,
  verified: {
    value: boolean,
    note?: string
  },
  proof: {
    type: ProofType,
    url: string
  },
  flags: Flag[]
};

export interface RankedConqueror extends NewConqueror {
  rank: number
}
