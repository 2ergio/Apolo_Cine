PGDMP  )    )    	            |            Usuarios_db    16.4    16.4                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    16511    Usuarios_db    DATABASE     �   CREATE DATABASE "Usuarios_db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "Usuarios_db";
                postgres    false            �            1259    24753 	   peliculas    TABLE     g   CREATE TABLE public.peliculas (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);
    DROP TABLE public.peliculas;
       public         heap    postgres    false            �            1259    24752    peliculas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.peliculas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.peliculas_id_seq;
       public          postgres    false    220                       0    0    peliculas_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.peliculas_id_seq OWNED BY public.peliculas.id;
          public          postgres    false    219            �            1259    16538    reservas    TABLE     �   CREATE TABLE public.reservas (
    id integer NOT NULL,
    fecha date,
    hora character varying(100),
    id_pelicula integer,
    user_id integer,
    costo integer,
    sillas text[]
);
    DROP TABLE public.reservas;
       public         heap    postgres    false            �            1259    16537    reservas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reservas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.reservas_id_seq;
       public          postgres    false    218                       0    0    reservas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.reservas_id_seq OWNED BY public.reservas.id;
          public          postgres    false    217            �            1259    24806    roles    TABLE     ]   CREATE TABLE public.roles (
    id integer NOT NULL,
    nombrerol character varying(100)
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    16513    users    TABLE     
  CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    username character varying(50) NOT NULL,
    telefono integer,
    fecha_nacimiento date,
    rol_id integer DEFAULT 2
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16512    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            a           2604    24756    peliculas id    DEFAULT     l   ALTER TABLE ONLY public.peliculas ALTER COLUMN id SET DEFAULT nextval('public.peliculas_id_seq'::regclass);
 ;   ALTER TABLE public.peliculas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            `           2604    16541    reservas id    DEFAULT     j   ALTER TABLE ONLY public.reservas ALTER COLUMN id SET DEFAULT nextval('public.reservas_id_seq'::regclass);
 :   ALTER TABLE public.reservas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            ^           2604    16516    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216                      0    24753 	   peliculas 
   TABLE DATA           /   COPY public.peliculas (id, nombre) FROM stdin;
    public          postgres    false    220   �!                 0    16538    reservas 
   TABLE DATA           X   COPY public.reservas (id, fecha, hora, id_pelicula, user_id, costo, sillas) FROM stdin;
    public          postgres    false    218   �"                 0    24806    roles 
   TABLE DATA           .   COPY public.roles (id, nombrerol) FROM stdin;
    public          postgres    false    221   <#       �          0    16513    users 
   TABLE DATA           b   COPY public.users (id, email, password, username, telefono, fecha_nacimiento, rol_id) FROM stdin;
    public          postgres    false    216   k#                  0    0    peliculas_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.peliculas_id_seq', 1, false);
          public          postgres    false    219                       0    0    reservas_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.reservas_id_seq', 64, true);
          public          postgres    false    217                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 11, true);
          public          postgres    false    215            i           2606    24758    peliculas peliculas_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.peliculas
    ADD CONSTRAINT peliculas_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.peliculas DROP CONSTRAINT peliculas_pkey;
       public            postgres    false    220            g           2606    16543    reservas reservas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.reservas DROP CONSTRAINT reservas_pkey;
       public            postgres    false    218            k           2606    24810    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    221            c           2606    16526    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            e           2606    16518    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            m           2606    24759    reservas fk_pelicula    FK CONSTRAINT     {   ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT fk_pelicula FOREIGN KEY (id_pelicula) REFERENCES public.peliculas(id);
 >   ALTER TABLE ONLY public.reservas DROP CONSTRAINT fk_pelicula;
       public          postgres    false    4713    218    220            l           2606    24812    users fk_rol_id    FK CONSTRAINT     m   ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_rol_id FOREIGN KEY (rol_id) REFERENCES public.roles(id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT fk_rol_id;
       public          postgres    false    216    4715    221            n           2606    24764    reservas fk_user    FK CONSTRAINT     o   ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id);
 :   ALTER TABLE ONLY public.reservas DROP CONSTRAINT fk_user;
       public          postgres    false    4709    216    218               �   x�M�;
�@@�SLe)�񃥈 &����W����������5����1��\p��&��(īڃ-�!(��V�F�p�Z�+}�!s�$|o|���0v�u�ϱ�H�1r�	��&n�ty�
��Ҳ��0u�ǣ����V�'�f��}S�D�+�� � r;�         �   x���K� ��p
05� ��(k�M�w�o��.��?R$��ؤF�*r��h�5��g�WHi���Z���K暠�.@�yGJ�W������xo��7��͹�n�=�G3����2�eH�B���5�⭋�c��k��\>�!�7�YP            x�3�tL����2�-.M,������� M      �   �  x�e�ɚ�@F��s�֒*�]deP[�/�bP%��{H��z�s���4����G���`�Q/�w!�nڊ�W��������cm0G��%i��L���r���*������)��<� !�	���C��h]:�c�uw<��í:��Z�ǋe�ɘ�C��b�M�;����7
�03Eh��L��i>����Rdgԣ�TVGD��;��E7o8��u��D3VJc��%3�E�AդIݰ#����"%ٷ��|
:�ir�\�a=ԏSd�q�Dj�8}^s�4I�[���*��� M����glˢ��o1��j6=��f���&�)j�N�-�R6cˀ�^��ä��꭪��Qh̰���M8�Ư�2��OSvv/���v�n*�fa����ia��Jp!6�G�����Ճ�1����>j�a��
+�Vhn����uul����ݠ�L�gmxWm7�;l�8�������/4@���7�qث��)��iJ)"�7uu�����66��,M�ɬ����
�� cW�Guy&����Xn�˄��m�!ܟ�g]"׶�SRN����uX#�Q� �-��UÎD��{�;v�ܻ��G��aA]-�e�TM/M�IZ����㓑�������d�'x><���]��
'�iR�jBbT�E)���Q�7��m�l����y�� g))����ϫ���qL~��d���=     