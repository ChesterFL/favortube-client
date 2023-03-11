import * as React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import moreImg from '@/assets/img/more-img.png';
import CommentArea from '@/components/CommentArea';
import { PostInfo } from '@/declare/tubeApiType';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { getContent, getTime } from '@/utils/util';
import { useEffect, useState } from 'react';
import PostApi from '@/services/tube/PostApi';

export type Props = {
  post: PostInfo;
};
const LongVideo: React.FC<Props> = (props) => {
  const {
    contents,
    view_count,
    upvote_count,
    dao,
    comment_count,
    created_on,
    id,
  } = props.post;
  if (!dao) return <></>;
  const url = useUrl();
  const history = useHistory();
  const videosResUrl = useResourceUrl('images');
  const info = getContent(contents);
  const time = getTime(created_on);
  const videoTime = '16:05';

  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(upvote_count);

  const moreClick = () => {
    console.log('Click more buttons');
  };

  const toVideo = () => {
    history.push(`/video/${props.post.id}`);
  };

  const getPostLikeStatus = async () => {
    const { data } = await PostApi.checkPostLike(url, id);
    if (data.data) {
      setLike(data.data.status);
    }
  };

  const postLike = async () => {
    const { data } = await PostApi.postLike(url, id);
    if (data.data) {
      setLike(data.data.status);
      if (data.data.status) setLikeCount(likeCount + 1);
      else setLikeCount(likeCount - 1);
    }
  };

  useEffect(() => {
    if (id) getPostLikeStatus();
  }, [id]);

  return (
    <div className={styles.videoCard}>
      <div className={styles.main}>
        <div className={styles.left}>
          <img
            className={styles.img}
            src={`${videosResUrl}/${info?.[3]?.[0]?.content}`}
            alt=""
            onClick={toVideo}
          />
          {/*<div className={styles.duration}>{videoTime}</div>*/}
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.nav}>
              <p className={styles.title}>{info?.[1]?.[0]?.content}</p>
              <img
                className={styles.moreImg}
                src={moreImg}
                alt=""
                onClick={moreClick}
              />
            </div>
            <p className={styles.content}>{info?.[2]?.[0]?.content}</p>
          </div>
          <div className={styles.bottom}>
            <p className={styles.name}>{dao.name}</p>
            <p className={styles.time}>{time}</p>
          </div>
        </div>
      </div>

      <CommentArea
        watchNum={view_count}
        commentOnNum={comment_count}
        likeNum={likeCount}
        likeStatus={like}
        likeHandle={postLike}
      />
    </div>
  );
};

export default LongVideo;