interface CharacterRelationship {
  name: string;
  relationship: string;
}

export interface Character {
  id?: string;
  name: string;
  alias: string;
  archetype: string;
  imageFileId: string;
  birthDate: string;
  age?: number;
  profession: string;
  loveInterest: string;
  gender: string;
  eyeColor: string;
  hairType: string;
  hairColor: string;
  hairLength: string;
  bodyShape: string;
  personalTraits: string;
  abilities: string;
  strength: string;
  weakness: string;
  friendsAndFamily: string;
  relationships: CharacterRelationship[];
  history: string;
  familyHistory: string;
}

export class CharacterFormData {
  name: string;
  alias: string;
  archetype: string;
  imageFileId: string;
  birthDate?: Date;
  age?: number;
  profession: string;
  loveInterest: string;
  gender: string;
  eyeColor: string;
  hairType: string;
  hairColor: string;
  hairLength: string;
  bodyShape: string;
  personalTraits: string;
  abilities: string;
  strength: string;
  weakness: string;
  friendsAndFamily: string;
  relationships: CharacterRelationship[];
  history: string;
  familyHistory: string;

  constructor() {
    this.name = '';
    this.alias = '';
    this.archetype = '';
    this.imageFileId = '';
    this.age = 0;
    this.profession = '';
    this.loveInterest = '';
    this.gender = '';
    this.eyeColor = '';
    this.hairType = '';
    this.hairColor = '';
    this.hairLength = '';
    this.bodyShape = '';
    this.personalTraits = '';
    this.abilities = '';
    this.strength = '';
    this.weakness = '';
    this.friendsAndFamily = '';
    this.relationships = [];
    this.history = '';
    this.familyHistory = '';
  }
}

export interface ComboBoxOption {
  label: string;
  value: string;
}
