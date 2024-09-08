import { model } from 'mongoose';
import playerSchema from '../schemas/playersSchema';

export const playersEntities = model('player', playerSchema);
