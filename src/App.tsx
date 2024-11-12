import { useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { Column, Table } from '@admiral-ds/react-ui';
import MaterialTable from '@mui/material/Table'
import * as Material from '@mui/material';
import { faker } from '@faker-js/faker';

import './App.css'

interface IItem {
  id: string;
  key: string;
  name: string;
  username: string;
  avatar: string;
  email: string;
  birthdate: string;
  registeredAt: string;
  text: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
  text8: string;
  text9: string;
  text10: string;
}

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const COUNT_ITEMS = 1005;

const LIMIT = 1000;

const itemsMock = [] as IItem[];
for (let i = 0; i < COUNT_ITEMS; i++) {
  const id = uuid()
  itemsMock.push({
    id,
    key: id,
    name: `name-${id}`,
    username: faker.internet.username(),
    avatar: faker.image.url(),
    email: faker.internet.email(),
    birthdate: faker.date.birthdate().toISOString(),
    registeredAt: faker.date.past().toISOString(),
    text: faker.lorem.lines(),
    text2: faker.lorem.lines(),
    text3: faker.lorem.lines(),
    text4: faker.lorem.lines(),
    text5: faker.lorem.lines(),
    text6: faker.lorem.lines(),
    text7: faker.lorem.lines(),
    text8: faker.lorem.lines(),
    text9: faker.lorem.lines(),
    text10: faker.lorem.lines(),
  });
}

const columns: Column[] = [
  {
    name: 'id',
    title: 'id',
    width: '150px',
    sortable: true,
  },
  {
    name: 'name',
    title: 'name',
    width: '150px',
    sortable: true,
  },
  {
    name: 'username',
    title: 'username',
    width: '150px',
    sortable: true,
  },
  {
    name: 'avatar',
    title: 'avatar',
    width: '150px',
    sortable: true,
  },
  {
    name: 'birthdate',
    title: 'birthdate',
    width: '150px',
    sortable: true,
  },
  {
    name: 'registeredAt',
    title: 'registeredAt',
    width: '150px',
    sortable: true,
  },
  {
    name: 'text',
    title: 'text',
    width: '150px',
    sortable: true,
  },
  {
    name: 'text2',
    title: 'text2',
    width: '150px',
    sortable: true,
  },
  {
    name: 'text3',
    title: 'text3',
    width: '150px',
    sortable: true,
  },
  {
    name: 'text4',
    title: 'text4',
    width: '150px',
    sortable: true,
  },
  {
    name: 'text5',
    title: 'text5',
    width: '150px',
    sortable: true,
  },
  {
    name: 'text6',
    title: 'text6',
    width: '150px',
    sortable: true,
  },
  {
    name: 'text7',
    title: 'text7',
    width: '150px',
    sortable: true,
  },
  {
    name: 'text8',
    title: 'text8',
    width: '150px',
    sortable: true,
  },
  {
    name: 'text9',
    title: 'text9',
    width: '150px',
    sortable: true,
  },
  {
    name: 'text10',
    title: 'text10',
    width: '150px',
    sortable: true,
  },
];

function App() {
  const [items, setItems] = useState<IItem[]>([]);
  const [isStopped, setIsStopped] = useState<null | boolean>(true);
  const [isHide, setIsHide] = useState(false);

  const itemsFormatted = useMemo(
    () =>
      items?.map((item) => ({
        ...item
      })),
    [items]
  );

  const generateNewItems = () => {
    const changedItems = [] as IItem[];

    for (let i = 0; i < LIMIT; i++) {
      let randomIndex = null;

      while (true) {
        const currentRandomIndex = getRandomInt(0, itemsMock.length);
        const item = itemsMock[currentRandomIndex];
        if (!changedItems.find(it => it.id === item.id)) {
          randomIndex = currentRandomIndex;
          break;
        }
      }

      changedItems.push(itemsMock[randomIndex]);
    }

    setItems(changedItems);
  }

  const onChangeIsStopped = () => {
    setIsStopped(!isStopped)
  };

  const clearItems = () => {
    setItems([]);
  };

  const hideTable = () => {
    setIsHide(!isHide);
  };

  useEffect(() => {
    generateNewItems()
  }, []);

  useEffect(() => {
    if (isStopped) return;

    const timer = setInterval(() => {
      generateNewItems();
    }, 200);

    return () => {
      clearInterval(timer);
    }
  }, [isStopped])

  return (
    <div>
      <div>
        <span>{isStopped ? 'STOP' : 'RUN'}</span>
      </div>
      <button className='btn' onClick={onChangeIsStopped}>{isStopped ? 'GO RUN' : 'GO STOP'}</button>
      <button onClick={clearItems}>clear</button>
      <button onClick={hideTable}>{isHide ? 'Show' : 'Hide'}</button>
      {!isHide && (<Table
        className='dictionary-table'
        columnList={columns}
        rowList={itemsFormatted}
        style={{ height: '500px' }}
        displayRowSelectionColumn
      />
      )}
      {/* {!isHide && (
        <Material.TableContainer
          component={Material.Paper}
          sx={{ maxHeight: 500 }}
        >
          <Material.Table stickyHeader>
            <Material.TableHead>
              <Material.TableRow>
                {columns.map((column, index) => (
                  <Material.TableCell key={index}>{column.title}</Material.TableCell>
                ))}
              </Material.TableRow>
            </Material.TableHead>
            <Material.TableBody>
              {itemsFormatted.map((it, index) => (
                <Material.TableRow key={index}>
                  {Object.keys(it).map((key, index) => (
                    <Material.TableCell key={`${key}-${index}`}>{it.key}</Material.TableCell>
                  ))}
                </Material.TableRow>
              ))}
            </Material.TableBody>
          </Material.Table>
        </Material.TableContainer>
      )} */}
    </div>
  );
}

export default App
