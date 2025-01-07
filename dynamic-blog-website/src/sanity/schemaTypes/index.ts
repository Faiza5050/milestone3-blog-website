import { type SchemaTypeDefinition } from 'sanity';

import {blockContentType} from './blockContentType';
import {categoryType} from './categoryType';
import {postType} from './postType';
import {authorType} from './authorType';
import {mentalhealth} from "./mentalhealth";
import {programming} from "./programming";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, mentalhealth, programming],
}
