import { Link } from 'react-router-dom';
import { Character } from '../../types';

const CharacterList: React.FC<{ characters: Character[] }> = ({
  characters,
}) => {
  return (
    <>
      <h1>Character List</h1>
      <ul>
        {characters.map((c) => (
          <li key={c.id}>
            <Link
              to={`/characters/${c.id}/edit`}
            >{`${c.firstName} ${c.lastName}`}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CharacterList;
