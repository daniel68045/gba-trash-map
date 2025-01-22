--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

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
-- Name: trash_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trash_logs (
    id integer NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    description character varying(255),
    created_at timestamp without time zone
);


ALTER TABLE public.trash_logs OWNER TO postgres;

--
-- Name: trash_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trash_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trash_logs_id_seq OWNER TO postgres;

--
-- Name: trash_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trash_logs_id_seq OWNED BY public.trash_logs.id;


--
-- Name: trash_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trash_logs ALTER COLUMN id SET DEFAULT nextval('public.trash_logs_id_seq'::regclass);


--
-- Data for Name: trash_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trash_logs (id, latitude, longitude, description, created_at) FROM stdin;
95	42.33286781432363	-71.04579985141756	Trash collected around Thomas Park	2025-01-14 04:05:50.412578
97	42.35319229051888	-71.0679978132248	Overflowing trash cans	2025-01-14 04:07:02.896933
98	42.35227255762384	-71.0706263780594	Trash along park corner	2025-01-14 04:07:35.727349
99	42.343459089841865	-71.07960104942323	Trash in park	2025-01-14 04:07:54.812667
100	42.341072144153095	-71.08339369297029	Trash along corridor	2025-01-14 04:08:22.723442
101	42.341666906538826	-71.0835385322571	Trash outside station	2025-01-14 04:08:51.853829
102	42.34141314194238	-71.08427345752717	Trash in station	2025-01-14 04:08:57.818601
103	42.340172059710035	-71.08355462551118	Trash in park	2025-01-14 04:09:07.704444
104	42.33920044653451	-71.08375320892176	Trash constantly full	2025-01-14 04:09:30.20792
105	42.405571050418715	-70.99088430404665	Trash along beach	2025-01-14 04:09:55.960499
106	42.40937352532603	-70.99047660827638	Litter	2025-01-14 04:10:03.677231
107	42.32022415142884	-71.06918334960939	Trash on street	2025-01-14 05:01:15.299861
108	42.29716315230734	-71.04534387588502	Trash in park	2025-01-14 05:01:32.499997
109	42.371489005668046	-71.03066682815553	Trash	2025-01-14 05:02:00.417861
110	42.36370483268878	-71.07191920280458	Trash	2025-01-14 05:02:32.868311
111	42.36785466205584	-71.07131302356721	Trash outside museum	2025-01-14 05:03:02.512251
112	42.322445305055666	-71.04420661926271	Trash in park	2025-01-14 05:43:04.94167
113	42.34103645823105	-71.09368801116945	Trash along fens	2025-01-14 18:16:24.580453
\.


--
-- Name: trash_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trash_logs_id_seq', 113, true);


--
-- Name: trash_logs trash_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trash_logs
    ADD CONSTRAINT trash_logs_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

