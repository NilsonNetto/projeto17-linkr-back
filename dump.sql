--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    comment character varying(150) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    "idFollower" integer NOT NULL,
    "idFollowed" integer NOT NULL
);


--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;


--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    description character varying(300) NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: postsHashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."postsHashtags" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "hashtagId" integer NOT NULL
);


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."postsHashtags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."postsHashtags_id_seq" OWNED BY public."postsHashtags".id;


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: reposts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reposts (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: reposts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reposts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reposts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reposts_id_seq OWNED BY public.reposts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    valid boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    "profilePicture" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: postsHashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags" ALTER COLUMN id SET DEFAULT nextval('public."postsHashtags_id_seq"'::regclass);


--
-- Name: reposts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts ALTER COLUMN id SET DEFAULT nextval('public.reposts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments VALUES (11, 30, 5, 'comentário do Mutano', '2022-10-25 17:22:40.124646');
INSERT INTO public.comments VALUES (12, 30, 6, 'comentário do Robin', '2022-10-25 17:26:06.53296');
INSERT INTO public.comments VALUES (13, 30, 6, 'comentário 2 do Robin', '2022-10-25 19:36:15.426559');
INSERT INTO public.comments VALUES (14, 30, 7, 'ahhh que tédio', '2022-10-26 07:59:13.410173');
INSERT INTO public.comments VALUES (16, 31, 5, 'poh gatinha, me segue ai pra gente ver netflix juntinhos. SOU MUITO MELHOR QUE AQUELE HOMEM PEIXE ESTÚPIDO e eu sou vegetariano hehe. #vegetariano', '2022-10-26 08:09:39.957621');
INSERT INTO public.comments VALUES (17, 30, 8, 'fala ae maninho', '2022-10-26 15:56:50.527593');
INSERT INTO public.comments VALUES (18, 31, 7, '😒', '2022-10-27 16:56:54.805294');
INSERT INTO public.comments VALUES (19, 30, 5, 'falaaa mano', '2022-10-27 22:32:48.932014');
INSERT INTO public.comments VALUES (20, 30, 5, 'como vcs estão?', '2022-10-27 22:40:20.948105');
INSERT INTO public.comments VALUES (21, 31, 5, 'poh mo chata vc hein', '2022-10-27 22:40:58.129732');
INSERT INTO public.comments VALUES (22, 31, 5, 'poh mo chata vc hein', '2022-10-27 22:41:03.96407');
INSERT INTO public.comments VALUES (23, 31, 5, 'poxa', '2022-10-27 22:41:11.91027');
INSERT INTO public.comments VALUES (24, 31, 5, 'fiquei chateado', '2022-10-27 22:42:38.086051');
INSERT INTO public.comments VALUES (25, 30, 5, 'saudades <3', '2022-10-27 22:43:26.790107');
INSERT INTO public.comments VALUES (48, 61, 8, 'vai dizer que vc nunca fez algo assim?', '2022-10-28 13:03:06.13899');
INSERT INTO public.comments VALUES (49, 61, 5, 'tipo comer pizza que jogam no lixo', '2022-10-28 13:03:50.607458');
INSERT INTO public.comments VALUES (50, 61, 6, 'QUE NOJO MUTANO', '2022-10-28 13:04:47.049009');
INSERT INTO public.comments VALUES (51, 61, 6, 'ESTELAR EU TE AMOOO', '2022-10-28 13:05:00.845855');
INSERT INTO public.comments VALUES (52, 61, 7, 'que vergonha', '2022-10-28 13:05:46.80977');
INSERT INTO public.comments VALUES (53, 61, 9, 'amiga Ravena como eu bloqueio um usuário?', '2022-10-28 13:06:21.304306');


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.followers VALUES (1, 6, 5);
INSERT INTO public.followers VALUES (2, 7, 6);
INSERT INTO public.followers VALUES (3, 6, 7);
INSERT INTO public.followers VALUES (5, 5, 7);
INSERT INTO public.followers VALUES (10, 9, 5);
INSERT INTO public.followers VALUES (11, 5, 9);
INSERT INTO public.followers VALUES (12, 6, 9);
INSERT INTO public.followers VALUES (13, 7, 9);
INSERT INTO public.followers VALUES (14, 8, 5);
INSERT INTO public.followers VALUES (15, 8, 9);
INSERT INTO public.followers VALUES (16, 8, 6);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (1, 'oMaior');
INSERT INTO public.hashtags VALUES (2, 'supremo');
INSERT INTO public.hashtags VALUES (3, 'vegetariano');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (10, 5, 31);
INSERT INTO public.likes VALUES (12, 8, 30);
INSERT INTO public.likes VALUES (26, 8, 61);
INSERT INTO public.likes VALUES (27, 5, 61);
INSERT INTO public.likes VALUES (28, 6, 61);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (31, 7, 'meu pai é taaaao chato', 'https://www.netflix.com/br/', '2022-10-26 08:03:17.877493');
INSERT INTO public.posts VALUES (30, 5, 'não tem ninguém melhor do que o mutano', 'https://www.google.com', '2022-10-24 14:04:42.829328');
INSERT INTO public.posts VALUES (62, 8, 'Natal está chegando...', 'https://www.tudocelular.com/acessorios/noticias/n197538/melhor-robo-aspirador-comprar-guia-tudocelular.html', '2022-10-28 13:07:42.738212');
INSERT INTO public.posts VALUES (61, 9, 'Seu povo não utiliza refrigeração?', 'https://www.youtube.com/watch?v=Lk0Kc2ahwjQ', '2022-10-28 13:01:58.008923');


--
-- Data for Name: postsHashtags; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: reposts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (4, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjM1OTMwMiwiZXhwIjoxNjY4OTUxMzAyfQ.OROXj4WmhedDQ4fCon1PnAgrfzbh665h4a2F-EwjHVI', true, '2022-10-21 10:35:03.00322');
INSERT INTO public.sessions VALUES (5, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY2NjM2MDI4OSwiZXhwIjoxNjY4OTUyMjg5fQ.hSphwkkRZoz7xbKTeVC7QITRlpPtA35tiBMbJCWj6qk', true, '2022-10-21 10:51:29.742272');
INSERT INTO public.sessions VALUES (6, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjM4Mzg0OCwiZXhwIjoxNjY4OTc1ODQ4fQ.Aq7PPccAwE-izvSBFx_458Bsvddju1Yp0WOetfnBmIo', true, '2022-10-21 17:24:09.000612');
INSERT INTO public.sessions VALUES (7, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjQ1NDUxMCwiZXhwIjoxNjY5MDQ2NTEwfQ.4Dgj_LO3ZE6pyGLu3p1HEEu66zwpk_50lwK4g_WMyRM', true, '2022-10-22 13:01:50.742201');
INSERT INTO public.sessions VALUES (8, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjUyNTk3NCwiZXhwIjoxNjY5MTE3OTc0fQ.FcDCiWTGqRhyBtyNQNcZNGY-OGWIUIl44QiGHWL_WgU', true, '2022-10-23 08:52:54.588793');
INSERT INTO public.sessions VALUES (9, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjYwNTExNCwiZXhwIjoxNjY5MTk3MTE0fQ.2msaqNIN5J5s009-S3s-dYbUsJXlND5K03cO-1f6L-g', true, '2022-10-24 06:51:54.234131');
INSERT INTO public.sessions VALUES (10, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjYzNzM0MSwiZXhwIjoxNjY5MjI5MzQxfQ.Zfc7OxqVgQvTKKUjSUSxQh0AVsaJJEXiuEqwHfIFGt0', true, '2022-10-24 15:49:01.794282');
INSERT INTO public.sessions VALUES (11, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY2NjcyOTQ1NSwiZXhwIjoxNjY5MzIxNDU1fQ.xYaJsna--8qCligdcrYf_Jrzoao-3m4qcuSJXwzwjPQ', true, '2022-10-25 17:24:15.464174');
INSERT INTO public.sessions VALUES (12, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY2Njc4MTkyNywiZXhwIjoxNjY5MzczOTI3fQ.a1GW5tiA4bmhNejtfl4NQA8pyhaRvckDLuW5eBJQHFU', true, '2022-10-26 07:58:47.530227');
INSERT INTO public.sessions VALUES (13, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY2NjgxMDU2NiwiZXhwIjoxNjY5NDAyNTY2fQ.KGFh766NNudwfxq7x4DkH2tiCGXBVPb4QUbE9jDsBfA', true, '2022-10-26 15:56:06.168687');
INSERT INTO public.sessions VALUES (14, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjgyOTM1MywiZXhwIjoxNjY5NDIxMzUzfQ.hfPFpObjm3K37FzX-1karu-V9zn6PcGz8SY5lNlAh4E', true, '2022-10-26 21:09:13.369896');
INSERT INTO public.sessions VALUES (15, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2Njg2Mzk4NSwiZXhwIjoxNjY5NDU1OTg1fQ.NX0bCy_jVdwx284cQtqs7xv4VOM87ZVlQQjO2owJTKA', true, '2022-10-27 06:46:25.328148');
INSERT INTO public.sessions VALUES (16, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjkwNDU2NywiZXhwIjoxNjY5NDk2NTY3fQ.Ucm4bpa0C4TOtiVQo1zbtJEiDMzkTfV2wCJOw92jmck', true, '2022-10-27 18:02:47.810256');
INSERT INTO public.sessions VALUES (17, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY2NjkwNDU5OSwiZXhwIjoxNjY5NDk2NTk5fQ.epsMT68gktKyd7jF5Inossd4ctM_VJ688nr0Om8rN7g', true, '2022-10-27 18:03:19.951074');
INSERT INTO public.sessions VALUES (18, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjkwNDYyOSwiZXhwIjoxNjY5NDk2NjI5fQ.oB8JtQR2G7TGGKUfh5XW2h50O84RmQttP-Zi8i-8DfI', true, '2022-10-27 18:03:49.958777');
INSERT INTO public.sessions VALUES (19, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2Njk3MTgxNCwiZXhwIjoxNjY5NTYzODE0fQ.24UAcOxlRVTsFpt-9HZnQo7Oss5vKU8Ek3eZ9K9kmSc', true, '2022-10-28 12:43:34.595819');
INSERT INTO public.sessions VALUES (20, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2Njk3MjA4MSwiZXhwIjoxNjY5NTY0MDgxfQ.6Gu8A6JN6BXXHnh-69-4dQUXhx7Rl26AcLlP87fW090', true, '2022-10-28 12:48:01.161156');
INSERT INTO public.sessions VALUES (21, 9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImlhdCI6MTY2Njk3MjgyNCwiZXhwIjoxNjY5NTY0ODI0fQ.vdS3D8LlIOBEDwhjpdZij9fU5F6EBtmJmKPmynbys7E', true, '2022-10-28 13:00:24.399433');
INSERT INTO public.sessions VALUES (22, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY2Njk3Mjk2MCwiZXhwIjoxNjY5NTY0OTYwfQ.PRWrKBOXK3itFl7ap3ngS9uaC7jPO9pwT8Zp5EpyjHQ', true, '2022-10-28 13:02:40.166934');
INSERT INTO public.sessions VALUES (23, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2Njk3Mjk5NSwiZXhwIjoxNjY5NTY0OTk1fQ.g4Ip3RltJKEFB8dYlZUvamvugW7nYcxJf97NyCq5Xgg', true, '2022-10-28 13:03:15.670579');
INSERT INTO public.sessions VALUES (24, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY2Njk3MzA2MCwiZXhwIjoxNjY5NTY1MDYwfQ.OqLEsWo8n5PYJizWXqPKNvrdqKdShX8mw-Ta11Vryj0', true, '2022-10-28 13:04:20.523473');
INSERT INTO public.sessions VALUES (25, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY2Njk3MzEyMCwiZXhwIjoxNjY5NTY1MTIwfQ.tIpPiFp3f4EDt5dGhc1I2HYlYxe9xO0fW5DI2HnlnjU', true, '2022-10-28 13:05:20.65614');
INSERT INTO public.sessions VALUES (26, 9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImlhdCI6MTY2Njk3MzE2NCwiZXhwIjoxNjY5NTY1MTY0fQ.f_Uz6Zr8upM606bvmpOyYpKlV_VAPLZguXBQd582mcc', true, '2022-10-28 13:06:04.531051');
INSERT INTO public.sessions VALUES (27, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2Njk3MzIwOCwiZXhwIjoxNjY5NTY1MjA4fQ.wKipOTzGxn9XzHx_mbDaTcT3WcDO-APQHpX6iVc7efY', true, '2022-10-28 13:06:49.043807');
INSERT INTO public.sessions VALUES (28, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY2Njk3MzI0MCwiZXhwIjoxNjY5NTY1MjQwfQ.L4ltAncBqO4CA_GfwX5HaKyeWZ-tiYkrvBnhkzaqzxk', true, '2022-10-28 13:07:20.208784');
INSERT INTO public.sessions VALUES (29, 9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImlhdCI6MTY2Njk3Mzg2NiwiZXhwIjoxNjY5NTY1ODY2fQ.i_qy52v5MP3TCHR-rKQg5vXUfqMlcWBXNzoQ0H6XhJA', true, '2022-10-28 13:17:46.130858');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (8, 'booyah', 'ciborgue@titans.com', '$2b$10$5r5Vn5YiX4LvZGQsGSqXZeqgo.fB45LjsBHLPhLtAdk5lZgMBGVRW', 'https://i.pinimg.com/originals/90/b6/28/90b628bc200639e9604ddcf19abeb7d6.gif', '2022-10-26 15:55:56.200049');
INSERT INTO public.users VALUES (5, 'mutano_titan', 'mutano@titans.com', '$2b$10$drwRApRETBpWpyC8GN65wubUxWfcKkJRvp9TDc24d8WwhTFaObtJG', 'https://media.tenor.com/h9lLx2wxPyIAAAAC/bb-beast-boy.gif', '2022-10-21 10:34:37.868963');
INSERT INTO public.users VALUES (7, 'tanto_faz', 'ravena@titans.com', '$2b$10$Z9Zf43q2mUQyE3QZaZ2vqOYjfPvNXObdM7w6yZwxY3WhK9dMtaHma', 'https://cdn.dribbble.com/users/1808107/screenshots/5093309/25_raven.gif', '2022-10-26 07:57:07.955321');
INSERT INTO public.users VALUES (6, 'robin_supremo', 'robin@titans.com', '$2b$10$6GVDbVWj0jr.xbc9g8exCujgZDTgivYb6B/Z7AKr14CwNyjBFSBJa', 'https://media2.giphy.com/media/ir9frXUFevlvZVFpnk/giphy.gif', '2022-10-21 10:51:10.99329');
INSERT INTO public.users VALUES (9, 'estelar_koriand''r', 'estelar@titans.com', '$2b$10$G7P8qJ2Ca5Wq8hS6yLFlGu3emO31Ttj10y0RhJTVRQzLlNCH9Ifpu', 'https://media4.giphy.com/media/H76N3dsTBjaxFytCSl/giphy.gif', '2022-10-28 13:00:17.770541');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 53, true);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.followers_id_seq', 16, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 3, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 29, true);


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."postsHashtags_id_seq"', 3, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 62, true);


--
-- Name: reposts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reposts_id_seq', 1, false);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 29, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key UNIQUE (name);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: postsHashtags postsHashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_pkey" PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: reposts reposts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: comments comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: followers followers_idFollowed_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "followers_idFollowed_fkey" FOREIGN KEY ("idFollowed") REFERENCES public.users(id);


--
-- Name: followers followers_idFollower_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "followers_idFollower_fkey" FOREIGN KEY ("idFollower") REFERENCES public.users(id);


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: postsHashtags postsHashtags_hashtagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES public.hashtags(id);


--
-- Name: postsHashtags postsHashtags_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: reposts reposts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT "reposts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: reposts reposts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT "reposts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

