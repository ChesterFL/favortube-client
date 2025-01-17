import styles from './index.less';
import rightIcon from '@/assets/icon/right-icon.svg';
import { JumboTabs, Popup, TextArea } from 'antd-mobile';
import { Input } from 'antd';
import { useState } from 'react';
import noTokenIcon from '@/assets/icon/noToken-icon.svg';
import * as React from 'react';

export type Props = {};

type AmountList = {
  name: string;
  price: string;
};

const DaoCard: React.FC<Props> = (props) => {
  const amountList: AmountList[] = [
    {
      name: 'Budget',
      price: '500,000',
    },
    {
      name: 'Withdraw',
      price: '500,000',
    },
    {
      name: 'Pending',
      price: '500,000',
    },
    {
      name: 'Remains',
      price: '500,000',
    },
  ];
  const tags = ['Blockchain', 'Blockchain Technology', 'NFT', 'MEME'];
  const [isToken, setIsToken] = useState<boolean>(true);
  const [tokenVisible, setTokenVisible] = useState(false);
  const [unTokenVisible, setUnTokenVisible] = useState(false);

  const moreClick = () => {
    if (isToken) setTokenVisible(true);
    else setUnTokenVisible(true);
  };
  return (
    <div className={styles.daoCard}>
      <div className={styles.card}>
        <div className={styles.status}>
          <p className={styles.title}>Web3 Airdrop Status</p>
          <div className={styles.block}>
            <p className={styles.left}>Notified To</p>
            <div className={styles.right}>
              <p className={styles.blue}>1234</p>
              <p className={styles.text}>Users</p>
              <div className={styles.button}>Details</div>
            </div>
          </div>
          <div className={styles.block}>
            <p className={styles.left}>Withdraw By</p>
            <div className={styles.right}>
              <p className={styles.blue}>1234</p>
              <p className={styles.text}>Users</p>
              <div className={styles.button}>Details</div>
            </div>
          </div>
        </div>

        <div className={styles.amountList}>
          {amountList.map((item, index) => (
            <div className={styles.block} key={index}>
              <p className={styles.text}>{item.name}</p>
              <p className={styles.amount}>{item.price}</p>
            </div>
          ))}
        </div>

        <div className={styles.tokenInfo}>
          <p className={styles.left}>Token Info</p>
          <div className={styles.right} onClick={moreClick}>
            <p className={styles.more}>More</p>
            <img src={rightIcon} alt="" className={styles.image} />
          </div>
        </div>

        <div className={styles.jumboTabs}>
          <JumboTabs className={'leftJumboTabs'}>
            <JumboTabs.Tab title="Chain" key="Chain">
              <div className={styles.row}>
                <p className={styles.left}>Contract Address</p>
                <div className={styles.right}>
                  <Input className={styles.input} placeholder="please input" />
                </div>
              </div>
            </JumboTabs.Tab>
            <JumboTabs.Tab title="BSC" key="BSC">
              <div className={styles.row}>
                <p className={styles.left}>Contract BSC</p>
                <div className={styles.right}>
                  <Input className={styles.input} placeholder="please input" />
                </div>
              </div>
            </JumboTabs.Tab>
          </JumboTabs>
        </div>

        <div className={styles.timeBlock}>2023/3/19/ 15:52</div>

        <div className={styles.details}>
          <p className={styles.title}>Details</p>
          <div className={styles.tabs}>
            <p className={styles.text}>Tags</p>
            <div className={styles.tabList}>
              {tags.length ? (
                tags.map((item, index) => (
                  <div className={styles.tab} key={index}>
                    {item}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className={styles.wallet}>Level {'>'} 3</div>
      </div>

      <Popup
        className={styles.popup}
        visible={tokenVisible}
        onMaskClick={() => {
          setTokenVisible(false);
        }}
        bodyStyle={{
          padding: '1.25rem',
          boxSizing: 'border-box',
          borderTopLeftRadius: '0.625rem',
          borderTopRightRadius: '0.625rem',
        }}
      >
        <div className={styles.popupContent}>
          <p className={styles.title}>Token Info</p>
          <div className={styles.inputRow}>
            <p className={styles.left}>Name</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="Please input" />
            </div>
          </div>
          <div className={styles.profile}>
            <p className={styles.left}>Description</p>
            <div className={styles.right}>
              <TextArea
                className={styles.textArea}
                placeholder="please enter the content"
                autoSize={{ minRows: 3, maxRows: 6 }}
                style={{
                  '--color': 'rgba(33, 33, 33, 1)',
                  '--font-size': '1rem',
                }}
              />
            </div>
          </div>
          <div className={styles.inputRow}>
            <p className={styles.left}>Total Amount</p>
            <div className={styles.right}>
              <Input className={styles.input} placeholder="Please input" />
            </div>
          </div>
          <div
            className={styles.closeButton}
            onClick={() => setTokenVisible(false)}
          >
            Close
          </div>
        </div>
      </Popup>

      <Popup
        className={styles.popup}
        visible={unTokenVisible}
        onMaskClick={() => {
          setUnTokenVisible(false);
        }}
        bodyStyle={{
          padding: '1.25rem',
          boxSizing: 'border-box',
          borderTopLeftRadius: '0.625rem',
          borderTopRightRadius: '0.625rem',
        }}
      >
        <div className={styles.popupContent}>
          <p className={styles.title}>Token Info</p>
          <div className={styles.warning}>
            <img src={noTokenIcon} alt="" className={styles.image} />
            <p className={styles.text}>Get token information failed !</p>
          </div>
          <div
            className={styles.redClose}
            onClick={() => setUnTokenVisible(false)}
          >
            Close
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default DaoCard;
