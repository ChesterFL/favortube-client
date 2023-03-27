import * as React from 'react';
import { ReactNode, useMemo, useRef, useState } from 'react';
import styles from './index.less';
import { useHistory, useSelector } from 'umi';
import { Input, NavBar, ProgressCircle, TextArea } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import { LoadingOutlined } from '@ant-design/icons';
import ImageCrop from '@/components/ImageCrop';
import ImageApi from '@/services/tube/Image';
import { message, Spin } from 'antd';
import { useResourceUrl, useUrl } from '@/utils/hooks';
import { CreatePost, Post } from '@/declare/tubeApiType';
import { Models } from '@/declare/modelType';
import PostApi from '@/services/tube/PostApi';
import { UploadImgType } from '@/config/constants';
import { eventEmitter, sleep } from '@/utils/util';

export type Props = {};

type AnimConfig = {
  visible: boolean;
  tips: string;
  percent: number;
};

type OptionsItem = {
  name: string;
  content: ReactNode;
};
const PostNewsletter: React.FC<Props> = (props) => {
  const history = useHistory();
  const url = useUrl();
  const imagesResUrl = useResourceUrl('images');

  // const [title, setTitle] = useState<string>('');
  const [mainText, setMainText] = useState<string>('');
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageListLoading, setImageListLoading] = useState<boolean>(false);
  const [postLoading, setPostLoading] = useState<boolean>(false);

  const { userInfo } = useSelector((state: Models) => state.dao);

  let animTimer = useRef<null | NodeJS.Timer>(null);
  const [animConfig, setAnimConfig] = useState<AnimConfig>({
    visible: false,
    tips: 'In progress...',
    percent: 0,
  });

  const uploadImage = async (file: File) => {
    setImageListLoading(true);
    try {
      let fmData = new FormData();
      fmData.append('newsletterImage', file);
      const { data } = await ImageApi.upload(imagesResUrl, fmData);
      setImageList([...imageList, data.id]);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setImageListLoading(false);
    }
  };

  const disposePercent = (v: AnimConfig): number => {
    if (v.percent < 98) return v.percent + 33;
    else {
      clearInterval(animTimer.current as NodeJS.Timer);
      return v.percent;
    }
  };

  const postHandle = async () => {
    if (postLoading) return;
    if (postDisable) return message.info('Please complete the required fields');
    setPostLoading(true);
    try {
      const contents: Post[] = [];
      contents.push({ content: mainText, type: 2, sort: 0 });
      imageList.forEach((item, index) => {
        contents.push({ content: item, type: 3, sort: index });
      });
      const postData: CreatePost = {
        contents: contents,
        dao_id: userInfo?.id as string,
        tags: [],
        type: 0,
        users: [],
        visibility: 1,
      };
      const { data } = await PostApi.createPost(url, postData);
      if (data.data) {
        setAnimConfig({ ...animConfig, visible: true });
        if (animTimer.current) clearInterval(animTimer.current);
        animTimer.current = setInterval(() => {
          setAnimConfig((v) => ({
            ...v,
            percent: disposePercent(v),
          }));
        }, 200);
        await sleep(2000);
        message.success('Post successfully');
        eventEmitter.emit('menuRefreshRecommend');
        setAnimConfig({ ...animConfig, percent: 100, visible: false });
        history.push('/latest/recommend');
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
      setAnimConfig({ ...animConfig, visible: false });
      setPostLoading(false);
    }
  };

  const postDisable = useMemo(() => {
    return !mainText;
  }, [mainText]);

  const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const optionsItems: OptionsItem[] = [
    // {
    //   name: 'Title',
    //   content: (
    //     <Input
    //       onChange={(val) => {
    //         setTitle(val);
    //       }}
    //       placeholder="Please enter title"
    //     />
    //   ),
    // },
    {
      name: 'Text',
      content: (
        <TextArea
          placeholder="Please enter main text"
          autoSize={{ minRows: 1, maxRows: 4 }}
          maxLength={500}
          onChange={(val) => {
            setMainText(val.trim());
          }}
        />
      ),
    },
    {
      name: 'Images',
      content: (
        <div className={styles.imageUpload}>
          <ImageCrop
            fileType={UploadImgType}
            shape="rect"
            maxCount={9}
            removeImage={() => {
              // setCommunityAvatar('');
            }}
            multiple={true}
            action={uploadImage}
          />
          {imageListLoading && <Spin indicator={loadIcon} size="small" />}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.content}>
      <NavBar
        className={styles.navBar}
        backArrow={<CloseOutline />}
        onBack={() => {
          history.goBack();
        }}
      >
        News
      </NavBar>
      <div className={styles.postOptions}>
        {optionsItems.map((item) => (
          <div className={styles.option} key={item.name}>
            <div className={styles.key}>{item.name}</div>
            <div className={styles.value}>{item.content}</div>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <div
          className={`${styles.postBtn} ${postDisable && styles.disabled}`}
          onClick={postHandle}
        >
          {postLoading && <span className={styles.loading} />}
          &nbsp;Publish
        </div>
      </div>
      {animConfig.visible && (
        <div className={styles.createOverlay}>
          <div className={styles.circleBox}>
            <ProgressCircle
              percent={animConfig.percent}
              className={styles.circle}
            >
              <span className={styles.percent}>{animConfig.percent}%</span>
            </ProgressCircle>
          </div>
          <p className={styles.tips}>{animConfig.tips}</p>
        </div>
      )}
    </div>
  );
};

export default PostNewsletter;
