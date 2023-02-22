import * as React from 'react';
import styles from './index.less';
import { useEffect, useMemo, useState } from 'react';
import NewsletterCard from '@/components/NewsletterCard';
import VideoCard from '@/components/VideoCard';
import postApi from '@/services/tube/PostApi';
import { useUrl } from '@/utils/hooks';
import { PostInfoRes } from '@/declare/tubeApiType';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';

export type Props = {};
const Dynamics: React.FC<Props> = (props) => {
  const url = useUrl();

  const [dynamicsList, setDynamicsList] = useState<PostInfoRes[]>([]);
  const { refreshVideoList } = useSelector((state: Models) => state.manage);

  const getList = async () => {
    const { data } = await postApi.getPostListByAddress(
      url,
      '0xE28E429D3616Bb77Bee108FF943030B3311b4Ec3',
    );
    if (data.data) {
      setDynamicsList(data.data.list);
    }
  };

  const getCard = (item: PostInfoRes) => {
    if (item.type === 0) {
      return <NewsletterCard cardData={item} />;
    } else if (item.type === 1) {
      return (
        <div className={styles.videoCard}>
          <VideoCard videoInfo={item} openThumb={false} />
        </div>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    getList();
  }, [refreshVideoList]);

  return (
    <>
      <>
        {dynamicsList.map((item, index) => (
          <div key={index}>{getCard(item)}</div>
        ))}
      </>
    </>
  );
};

export default Dynamics;
