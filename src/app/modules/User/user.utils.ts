import { v4 as uuidv4 } from 'uuid';
import { User } from './user.model';

export const FindPreviousId = async () => {
  const PreviousId = await User?.findOne({}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean()
  return PreviousId?.id
}

export const generateId = async () => {
  const LatestAdmittedId = await FindPreviousId() || (0).toString().padStart(4, '0')
  const NewStudentId = uuidv4().substring(0, 4).toUpperCase() + (parseInt(LatestAdmittedId) + 1).toString().padStart(4, '0')
  return NewStudentId
}