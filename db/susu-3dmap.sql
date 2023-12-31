PGDMP                 
        {         
   susu-3dmap    15.0    15.0 1    1           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            2           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            3           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            4           1262    32877 
   susu-3dmap    DATABASE     �   CREATE DATABASE "susu-3dmap" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "susu-3dmap";
                postgres    false            �            1259    32878    floors    TABLE     o   CREATE TABLE public.floors (
    id integer NOT NULL,
    floor integer NOT NULL,
    points jsonb NOT NULL
);
    DROP TABLE public.floors;
       public         heap    postgres    false            �            1259    32883    floors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.floors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.floors_id_seq;
       public          postgres    false    214            5           0    0    floors_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.floors_id_seq OWNED BY public.floors.id;
          public          postgres    false    215            �            1259    32884    rooms    TABLE       CREATE TABLE public.rooms (
    id integer NOT NULL,
    corpus character varying(255) NOT NULL,
    floor integer NOT NULL,
    number character varying(255) NOT NULL,
    "wallColor" character varying(255),
    "floorColor" character varying(255),
    walls jsonb[] NOT NULL
);
    DROP TABLE public.rooms;
       public         heap    postgres    false            �            1259    32889    rooms_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.rooms_id_seq;
       public          postgres    false    216            6           0    0    rooms_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;
          public          postgres    false    217            �            1259    32890    sprite_types    TABLE     �   CREATE TABLE public.sprite_types (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    img character varying(255) NOT NULL
);
     DROP TABLE public.sprite_types;
       public         heap    postgres    false            �            1259    32895    sprite_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sprite_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.sprite_types_id_seq;
       public          postgres    false    218            7           0    0    sprite_types_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.sprite_types_id_seq OWNED BY public.sprite_types.id;
          public          postgres    false    219            �            1259    32896    sprites    TABLE     �   CREATE TABLE public.sprites (
    id integer NOT NULL,
    floor integer NOT NULL,
    "position" integer[] NOT NULL,
    "spriteTypeId" integer
);
    DROP TABLE public.sprites;
       public         heap    postgres    false            �            1259    32901    sprites_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sprites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.sprites_id_seq;
       public          postgres    false    220            8           0    0    sprites_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.sprites_id_seq OWNED BY public.sprites.id;
          public          postgres    false    221            �            1259    41137    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    41136    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    225            9           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    224            �            1259    32902    walls    TABLE     �   CREATE TABLE public.walls (
    id integer NOT NULL,
    floor integer NOT NULL,
    points jsonb NOT NULL,
    "isPillarBefore" boolean,
    "isPillarAfter" boolean
);
    DROP TABLE public.walls;
       public         heap    postgres    false            �            1259    32907    walls_id_seq    SEQUENCE     �   CREATE SEQUENCE public.walls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.walls_id_seq;
       public          postgres    false    222            :           0    0    walls_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.walls_id_seq OWNED BY public.walls.id;
          public          postgres    false    223            ~           2604    32908 	   floors id    DEFAULT     f   ALTER TABLE ONLY public.floors ALTER COLUMN id SET DEFAULT nextval('public.floors_id_seq'::regclass);
 8   ALTER TABLE public.floors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214                       2604    32909    rooms id    DEFAULT     d   ALTER TABLE ONLY public.rooms ALTER COLUMN id SET DEFAULT nextval('public.rooms_id_seq'::regclass);
 7   ALTER TABLE public.rooms ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    32910    sprite_types id    DEFAULT     r   ALTER TABLE ONLY public.sprite_types ALTER COLUMN id SET DEFAULT nextval('public.sprite_types_id_seq'::regclass);
 >   ALTER TABLE public.sprite_types ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    32911 
   sprites id    DEFAULT     h   ALTER TABLE ONLY public.sprites ALTER COLUMN id SET DEFAULT nextval('public.sprites_id_seq'::regclass);
 9   ALTER TABLE public.sprites ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    41140    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    32912    walls id    DEFAULT     d   ALTER TABLE ONLY public.walls ALTER COLUMN id SET DEFAULT nextval('public.walls_id_seq'::regclass);
 7   ALTER TABLE public.walls ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222            #          0    32878    floors 
   TABLE DATA           3   COPY public.floors (id, floor, points) FROM stdin;
    public          postgres    false    214   �3       %          0    32884    rooms 
   TABLE DATA           \   COPY public.rooms (id, corpus, floor, number, "wallColor", "floorColor", walls) FROM stdin;
    public          postgres    false    216   z<       '          0    32890    sprite_types 
   TABLE DATA           5   COPY public.sprite_types (id, name, img) FROM stdin;
    public          postgres    false    218   ��       )          0    32896    sprites 
   TABLE DATA           H   COPY public.sprites (id, floor, "position", "spriteTypeId") FROM stdin;
    public          postgres    false    220   ��       .          0    41137    users 
   TABLE DATA           ?   COPY public.users (id, login, password, "isAdmin") FROM stdin;
    public          postgres    false    225   ��       +          0    32902    walls 
   TABLE DATA           U   COPY public.walls (id, floor, points, "isPillarBefore", "isPillarAfter") FROM stdin;
    public          postgres    false    222   �       ;           0    0    floors_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.floors_id_seq', 316, true);
          public          postgres    false    215            <           0    0    rooms_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.rooms_id_seq', 1095, true);
          public          postgres    false    217            =           0    0    sprite_types_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.sprite_types_id_seq', 8, true);
          public          postgres    false    219            >           0    0    sprites_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.sprites_id_seq', 171, true);
          public          postgres    false    221            ?           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    224            @           0    0    walls_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.walls_id_seq', 607, true);
          public          postgres    false    223            �           2606    32914    floors floors_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.floors
    ADD CONSTRAINT floors_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.floors DROP CONSTRAINT floors_pkey;
       public            postgres    false    214            �           2606    32916    rooms rooms_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.rooms DROP CONSTRAINT rooms_pkey;
       public            postgres    false    216            �           2606    32918    sprite_types sprite_types_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.sprite_types
    ADD CONSTRAINT sprite_types_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.sprite_types DROP CONSTRAINT sprite_types_pkey;
       public            postgres    false    218            �           2606    32920    sprites sprites_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.sprites
    ADD CONSTRAINT sprites_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.sprites DROP CONSTRAINT sprites_pkey;
       public            postgres    false    220            �           2606    41147    users users_login_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_login_key;
       public            postgres    false    225            �           2606    41145    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    225            �           2606    32922    walls walls_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.walls
    ADD CONSTRAINT walls_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.walls DROP CONSTRAINT walls_pkey;
       public            postgres    false    222            �           1259    32923    rooms_corpus_floor_number    INDEX     c   CREATE UNIQUE INDEX rooms_corpus_floor_number ON public.rooms USING btree (corpus, floor, number);
 -   DROP INDEX public.rooms_corpus_floor_number;
       public            postgres    false    216    216    216            �           2606    32924 !   sprites sprites_spriteTypeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sprites
    ADD CONSTRAINT "sprites_spriteTypeId_fkey" FOREIGN KEY ("spriteTypeId") REFERENCES public.sprite_types(id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.sprites DROP CONSTRAINT "sprites_spriteTypeId_fkey";
       public          postgres    false    3211    218    220            #   �  x���9��6��~���x����̾�=pb;p暻��U�AH�Ӗ�&	b#@�y�������_����������3~�������s��g����0/��ؗ�f��o3����J�L|�m&��چ�+l3ZÊ�O/�N��tP�$�,�J�9��5f.��9�(�a�6t�P	�CFe�eX��ҠR2ʀeɨ 2�zM�x�"�PF%���� Ce�PFi���2��2ʂ��(b�2ME1.��L>����!���t�ɡ��F2������Ϧ�daM"(�� �ȃ �y�+XS^��a�iX���&�iB^��%��4vW]���:d�<�π��¡L��R<s�-.���R< &(��� ��6�D�a�.\�Ą��cL���16��b�����1L�3Cu�g-�n�D�Wͩ\�h.{�_Z4�Xr]�_/�2*���:�@kY���<�I�t���\�Ij�(�!z�%�!�In�Ad����,~ݬ�g�ů;��^\B�vc(X�w��	�Pc�&8�H�`�����6�|�w�°�����7�1�5}[V��Ă��G��~w��P��Q0��{�����;��E�������t��h�`$ 0���I<�PZ)�S^w�è������p�|J9�4)�)���j�ZsUQ��^�Q�G��Ӥ����hެ���m)��U�Yn}fܟ�'�&�~�p�'��{_�����[.bձs���ͅ�`З�#�P�Z!gлH9t/R��/��^�ZT���=ԗ��0	�\���Eʡ�H9�)�����끰��\�P]d�Emb�,BK�#z��9�)RuL��i��<p�L`�b��`$1�AG��B I���'��ⰝFC��	s���c��SU[	�4���k��+�1�+����#;����~�-ߖu������cʶxL׶`�w`�Է`L�O3�I`�oI�2���iW8(2��ɚ�3̹�t���D�G��N���ö����j�0�`���7���������ax������%a��l��H�Xt+�}k���:2���>/�t����Ӵ��É\Zx���XX[���o�t�ƴ1�����m�����k�OX݂[%���>=O2��I2��0�����uT=Gղx���$R3�4��$�c;��8��Mq8�Gf�e�XSi�7�0��rIS�S�ڀгk��a�6`��Y�2�K5,]a�z7`rql��s����1��9j}d���|T/���rkd<�ݎܕϦ\F�~[>��&��S<\ �R׻/B��S�<�G�� �'����cQ��
/׮$�u�Ǥ�H;��Z�̧Rx�}�*�'q�F��ڳ��E*%��Vɝ���c��hx�7Ɇl+��r42�t�gt��ݚ��.:��-��}��\ ށ�N�L;00��=�q�p�a>�\d�C?|Sz��5?��l�*w�����Vs�x����U�Wv�il9��X'�09�y?��Y�7�^�Dx#�4r�,}��b�yn��}yQ����#���<|�)���j��N}�^!�{Ш�Av���P��8�Q]w«v;�����5������)��S��!0��p�|�57f�h��c�l�����x�%r8�Q��7��Q�3^�߂ol��q�4�p��9��~�?�g�|�$������h�	��`zHـe-9̷��!�=s��A��O����B�]T �4G��YrC��4;���u��<c�#L��c�����#��|���iptϭ��&i�#[e�^�����P\�p}��_+xm��{�f^*N�_��s�{3����ꊺ�\��f����Ԝ�����!�0z���2���](&{w�c�&����d7>�*�"��倾��^��\S�^&��H��[ۦ�QNМ.�\8{jr j�����yf�t�ÍO��z�r�[/�*#�+���S������F��^����><�4n�j
�:����03;Tlu�w����v��kv��s�{��řU1:�]L�����	&�;W���G^�ブ/�ŏ<����1x%����-�v=��ܑ�/��U�~ӸhmzN?ۙ�k��'�#�S��(���¹��V����BGz(KĦ��<2ڇ���%?��#������\�a1�S]�Q�
[͏�0�1r=���+�Rgն�"{
��PZ]�<�5������������t      %      x���ˮ49�&�>���m��yq��v��Pk1�� #F�T�j��./ԥj-��o��$=���q?'<~G&Px��4�hwK>|�?���?�?����?��3�/����������w�������?�������?����4������?������1�����/��?����/���������������Gm	AT?�������-t���b��@Pd�,(��ɺ��D�&+jK�:xWyTm����� �zZ�'�A���oi�o�?܇���s��R���׮�{�hL�(�d��M��Z��%!'��q�7�ue�O��8�G��E� �J��D�7.�g" Y/�-7%��X��O�ݞ�,s_C�&eZKb�NsKJ9dK�c�4&�x�&5����8H�f���l��E�y�A�t �d��u�82�����/�ňoK4r��1uW�%{���v�� ^9	-|�]>��_��c�����l/���:Z:�m��Ml�@H[�'H�H����f�Jg������aI����+����%dKa&�^�d���9�a)��5âV�Y�қ��˷�3�[2h�JȖ�$���`�`�0pq��ٖ�zpD���Dt��AH�-7�����I�P-j��G�F���_�� FYc!���T��7+ae��1�,	5�4*�d;� R���MB�w?����$WY�G�L*K���' ��zAA��pC������6ǪmJ�g��J�:H�:@3�l]l�P������2z�ɺ�V97ﰄsړ�-�qy�$"���2��v��+\v��W�0�9ōK�A9�}��[2H���|�o��W.}$��rˈ���v��� ��� M�₇m���$cj��6��f�ݴ� 	����6�o>|��:�g��cȨ+��D��� (��Pw�0��d��n
�v<H5&��!u�|&:�@:)<�h�EF{JCu�)��2|j��R��tЛ��ATe�������l�@H���rQ��8�~��j����Qw	;:p�:̖��µ�W&J�/5�:8ʇ�Z�!�]?*��::h�JL*��~c�qjք�C����A*~	�j��S�Z���M�-�����-�P�1�Ʉ���P%�1�%!�+'88�b7�0M�6����&d�6�%��<G��&du.&ą��s�`���<�~�oG�9��|``���.���]�Z���6�|�m���o"�nq�������?|���QwgK�ux:�0t����-�`J�=�K�܃��Z��>�_״i?-��5	mf��a)tA9I��`d u(|�8��e!������5ޞT~��{�B޳����/��}��ŤnK=/�j���T�i��2	�v��l޸�[�Ją�,v�k����E:����B��h�wȟ�iP�f% �V�dl���$�Gޙ,rÕ"�h��{&T����tx�S���J̭ջ�wSd��ͳ��pO��)�ŷ����ج3)6p��rcwɖ?)�*`�J���)Ʌ��y;�T��R=�73�`��'�=���\��<���gNh�EH�)�5GH�9B����!��|S��-�7������񐑫�����?^��r��7m�wK��kg3G�c �&�S5=�@���6 )r��x����%�PMO�>Uv�aӧ;�(}JyE��خ1q��'�m!��}E��b����!�qY��o�N�Zݬw\?'�񳒃 �3��42�R�Qb���#@����Āe�����i�C�㳳H�:�#*�2==�E�G��Sz��'@�����5aQT���/�+����l�����9%s�9���R����Q/��WА����L<w&���Wm�"�1Yq���-IG��H���֐W��ۺs:����87�&y�~����%DQw%�����Da�@�"	�,ۚJ�����6I���v>�庡@'t�,N��L渾��?5���H�������瑂q�IU�$"#���{N��{^)�B��K����䞍��A��e��∻���״�mO��Z�L�c�	d�q�c<D�#*s�Fl�����.��K��D㚰T��
����'[#
��4���$# ����"KD`����P�&�UwL?ҁ�����1���L�
���=�`z�)�+U�~oQ���Ikɀ�+����T��)�Ï�6��}>Q��BF�o��j-Q��z}Z����s1|�1��.�;nY�!��4j�yK&��r�B�/�������3��*��&��$�R!jɠ�+!)�n
���Po�ȓY� <��M�<̩�xGBru��NV��ʫ�n���_����n�Up�z,�m���h��D�����\�Ce��d�z��,�;{��S��gv�\v����.q�����^V��[�1N�u�nJ��Lun�s��8W���Ww	��=�K�b�)R9�N=/֩'�:.J�Z�M��K�;�V��������
�Յ$&�U0��
�����&��ٖ�T�F-����?,$��Ev�8ԷP��"ZU��~Y�T3�D)�p�aKb*�q߫�`���_E���L0G���J��)�jI����=�;N��{�]�HARhw�o��Y��i�ߊ�P�:(�H�x\J�Z&<��hHSϟfS�~�Z����,�<�����R�!�m��
!���Z��l{2[2R����x��>��BQ��y�Q����ԩ(-���T���U٩�Ј�c r���� �]��O�e[��D��|�r�������D��B��q\[9q����x@���6�v�d&|$�6���7HDC�H��[՟-NO���'���k�A�H>v�x�<q�L.틂Dr��[�B�d $�m��J�+���>�q�@iE��T$&%���PN�@cZ2g�7�T����L>���c��
��9��#���k�{��`�.-�rS2<Ʌ�s_��䓤��<c���
e��o���!JȖ��iZ-����1��a�l�˿����<�a�Dd��y�3�=A�@�<n'l��D�86J��������_qFT:TI.و7X�ڰ(���JZT��FS�4�d�L����W%%�Z3��&[�CKBjS���I:Y1��[>QWR�4���t �R�$��K�L.֖c*f �A�Vr��[9����E *��7T��������\���4v������&D�@"rq9�NB%�f%dKBr�����\s�%���ϒf����&�C�3�%f���$W9�\�U���}�k��ζ��O�JňG�|�lq��MQ���
\�� ��Q�QBѦ��X7�ȭ�B�:�͏Qh)��:�J���Zc	�S����{EC��JāE�o��M(2!=�4��<��\�Xs�S!Ae,�hLK,�|S�˖Z��%!���㼱P�@��i�>��v�~�/����aHA�wp�Th�����N�hdkYE�X�D(���H5�]49-�S3�[�@bx��<����Mڒ��J��$����q��!��ȏ��HL�n�dG�	�貐�ew>ֺI'�*�D�h���t ���D�3�]Z�(D�:�k��S$�RE	6�aƵ}�+J��_��BM��$g^��?��d�leEø�A�
�X�EcAK�P�t`��x��~~��i�&���x@���ml4��fy����x�9��=q��k��4T�\U������Z���Ӕ���Q�S���.Qk��9��5�J��\��$� a�����;C&[MCKBj�.��h,�;8��h��&�j+�x��4�IUvGHj$o�}��ĩ�ƴ�wճ�U[a�;���'W8�4�4z��IC��8�� d���n\�([� ��<(״���Σ w��i�S�Lr������&>�w��Lw�3�L��d��V���:z��V�+S���=l)��m��7'H��W3� ���U��:9:��� 8mr4^�*M�N��O��*�ʢ�'C�٦-����j�!OR�%���)~2�f��Hm�9�:P���6	-|�20    TJ�����bLn�^��?������������Db���xD���N��ݜG� 4��k%���l,.��)�|���s$�2��)��>1���㜈���� |����|���]Č��64oN_����-�v��!������c�6��ʍD�-�Z����i�����X����9Ez5�%iG�`I��ź�E�.�-|���d〈ffB�5��?`�]��h��He4�(�XDE7nqsQ]��by5��N���v�)-��svYH��j�r���5?%d���]9(�k�l�/�L"�	�����ŭ��U�Ĥm�0UO��>��'񴟭O�#�F W��B�*"�j�;�D=����t>��Z�q��F�o�sQƘ �H��B�”> (Ogp�G ��2�j���*xK��րx�sN'KN����v�����7TO��5�j�K�"�16�����;��6���֎��k��*ʍ�W���%��Z
745N��V��������%՘���U�w�^9oQ���\�:��<�}�_�<���� g�-\�ȯM�E�m�ؐA����ؒ���
�-$"�n���X��yE�?w'�A9�&<ҬL< W7�j[MѴe>�aǣw��x�<�4�j��j^��2����8�B�ׂ~��W�x���D /��E"�2��4ȅm�R�I*���+X�j��yئ����H[�J(ރI�x��w7���lS��#�^���u4ySF��L< �M�N�Qa�_����Ą�	���ժZ���cm �*^���l�.������Z�%`b'f�ژjK�A!=	�6C�!������Q�#5����~�n����\P�s�+w����6ј���v�1rc�lK�m�`+ճ�C�o����M�X<�ʜ�#s�K��%�����B�����-&J��K3��zT�"��<��-�e"��C��|T6�oɀ�+�3�:�2)J���h�-k8`��7��%�֭C\x@�a�6�D7���� ���:�cmٮ�!J��|�Ƨ'&�D��r�v�>&Q��L�_�n�x�� �ܱ�z�A&��O{".�µ,E�T�^���k�/��P��LO2
�$��۩8��A�,<"l���s����+%��U�juAýo��E702T�iHơ�K���$m;�"4�;��ET��Ι=�#���4T�'2�Z�@	��¾+c���k�/x@Q;��pC�*)�f[Fˌ{~Dn�"g�8���Nmܿ�����{Ye�����2Oi�a�<�Orܚ1��|��NbJǭ�!UJD西�����2P�����EV��D���f�%;�/f`�����@��I�0�	[�M���`�Ն��AI'���0e�CQ�)�@���9a��i�oP�w��`/��r�67�D��/�W���˒x1K��:#JT�^:PΘ"�������"|&z�G�3 ��bx� l��,U�Iҗ"�W�.�gOq�N;� ��r2tB%x�����Ab-oҟ�.����ɴ��I��/����E��*�$�:�8q�]v6�%!�u�F�::]���<n��g�E��YD�h{&z��d�{&�����ځ��L�Çn����/���5�0�ӜD'��-&��,�rzЂ��L
����k�4�����of�������X���t���U���D	>k=R>S7Zi��x$�
N>@����`�/�g�2u깓�"�����	��s��jHT�2�R�H=O�$�}��m��a�@�G��,K�e�)pS�o�L�E֕x9'%x�	����]=\N�:�R@~\	a�I$���"��@*��!*�׏��l���\��iY%�v�d�
W���e�~��s�z�N�8c-H�7|ms�������*���l0�4��U8������ ��������������a��+��cI���JȬ�8$����[�jlM�qq�,�(���%��GQDS�p'v���@a����&V�q(���x�]?�vm�YEJƙ��+?^�{U���T������k�e"g0~�/��7���C��DNO��fd�-ɠ%!uN���	���<\��:�� W��.Y����:pB"+�I :O�	�O}{�n�[2h�&=�d���q*��T��V���(� ��]u��/tW%W�%qW]��k�n\*�D6ډM�wqW%_X&R���O�q)T�I^�K��q�>���X�2Sp�oi�t�d!!�Z8��A��޹R�~<�ʥjS�����o�e6�7R�Hl��%�ۥjK���O�&����(���497͵9��eūr��^�u5���z��u�C���ka��\�73��-��w���!h#�+��+3�C�z��<��L�d��@�6�)�r��� g4	�`�h���EQ�O�u�I:�U�V7����� �ܟ���}e��9G�f�C�D*�
��P�\��
A�P����\����.��;�2�j�	3�m
���?���NI�����W{�/���
HuF�����I�|���_m3)Ӹ�O�L���V�����Y�A���v�
>��Q�O�D��r�G�I��X;IS�w�NQ:�#��iQ`���CO���I,�0���FYf�����o��b� ג��:U�%{�d�c@��?e<?9*>4��f����� He�섢�X���O����G�
���9>n�4�9g2BV޹ʻ��?����Ʋ���)�!��6��2��t�O��ٕ�2M�%Z�F[�q$�E�ET��|:�,���+�$q�3��}L�qB�y�>��L䱼�_/���C�R�	o͕�g
��~Z]_���k��)�#��j��_�[isu�d ��[Iy.���?x��|�X�|]{���y�<��$8x���sdf;���Tg�'��d�h�#��Jd��d'T_�\>��d�����>��y����^ɓ+���N��_ZkTe�bfh�¡�~��$�$�z��^-f7�TNr/�ce�����n�Ty�9�Ԗ��Gp!���@�g����/Ce��
��C�����l�2'u��.�^��2/琙k�F/q�]u^�3o�F$�˚1k>�-�+�D�R�+e��+)�I��3�ϫm��,��1 Om��u,k�۔�L���PkV&p��][�'���_l�P�M���/jȀ]F�]� ݟؐA���Q�����-V�Ir3���+����f��L�-�C	�x@��l+�D�2,�j�^�6h������1�m�C��6W��j����5�ic��#V����|;QO�F����;	�aeGr��T��%�7���1:~�_��I��7TКu��df&�� �'�&��ky>O֢�m���&�Z2Ry�[2`�Ją9�d�wn����/�	��u����>�,$�/&ąd޹q��N"��v��>�O�R=iȠ}F �}� gXm� �n�[7���MW�ݬ0�&�"��ӂJ�B�K"�.Q�Jo\C-���Q��I]u�$QÜ|��M)��xC�9%dK���<&p�ii�L
�QS���S���-��c/p �;�]:p6��3n
)8�
�ʶP٦pVθ�,�c���w�|�i�f`�I�����*g��d!Ny�Uk�}��Lp�fӟ�[>1Fx��r�2?�^�8�Ak�}��'� �J�Y�x@����m�B�\ �^�6|>�~�\>�B��cԜũ|�W��ƈ[p��e��e�-��$�j�M�����M~�אA��l�v���>�� �$}����;QϰX��`_J��Q�������e�{��pJЎE�ςB���Z��@�hEm	AT��,:§�Q;BU}X[�'�Y�z�xý����"k�ez�09���*'~c��� �r����GX�{�C��C˕�dOC�L�8�f���5�D�.W��-��2Q-�U��r�<i��
y$��
y���17���E����05�q��Jf�A�d�nr!�a�8��"r�f!|7o�ſ�~�o:�JK�\ْ���kq5�]5�E�t��1NqAJZ�G���9P�vt ��8��@���(�Z�]    �J�������O��-�QI�i��!����x�����'HK�M��3^S� �qJ��c,|����8�季vi+����{��MsQ��Kc�lSd�,��1��.��<`�vi�*�i)�q�2��V��f�Ɋ{�S �ߔ�E-�#�Gۛ�E��YP����0[2pCY&��DG�Qa��Z�!��}���;:p��NH�ϒ�1�PV�Uq�,cz<�u���c2��D\%fKn(�[��T��`a"X�,�e!��Cv�~�����J̖�P��ӝ�iV��	*l���2Z�!��}4^n(c��0[2�KG���D�wf<)���n׏�Ρ��A�Wb�d $��%�Pu���0E��2Z�!��}ԙ���7��t0����с|�0oGc����Y�1�}��(�*ʛv6̖����C�F�����,���*�����\�U�6̖��|���,TX�~ >u�&��Cv�|�.��V��l�@H&�#�٣�F� 7����*����λ�с��a�d $H��?iT��r�2��Y��ݮ��\8��(1[2����1��g�{�,�e"��C�{�h<��4J̖�d��4��*�(�gW�(s��R�H��K�W���V&D��^��;J��4�S����	msB��I���R��m��J��dWObr^��x)D]΋�8�7�@���i����U:�Z:p�:̖��bgK�&Hr#*Ա�Y�B�]v�n׏ڶ]-�z%fKBr����q�:u��M����t�~kCR-�ᗛ�B�=� �f�i)6��X��N�X�)���m��m�x.�XN�1��S��ѱ� �()ש��,��j������r0��]C����n��#��J�4t�>��������M�/"y2���#�*5Ŷ��Prp�fTj�^}ugPv�I�=s�Y�\稴�v�C.��/z:�]�]�����9�IH&�k�{��f$�cD��ƍ\�KN����!�jLP�D���%w��ay5�"[�C*sg���>�r<��Ȇْ����f�k5�H-e���H��u����H��ڴ:fKB��0;ڂ²��"�faK���s���I��-�|�]>���C��4A�j�� ����x�[BU{��[3A[�GЙ�Ļ�0�[��=b."̵�Ǫ)���멣�G�#Q�;���`A��!���/��Z��L���&���D����2p����D�9K-�yю�L̆K�u(+=)�_��^�!�>A[:T�ʖ�	t�����(�<R2`LF����J��=�#hK�*kG�����:�H�H���BpF�+9bϣ�ttt �����$fd���f�b$��U.���#hG�*��=�����G�͸�NC2u�4�o�:0���B��X���Ё����[:T[���A�Wb�d $�80WX��XB�Qd�"X �}�jP�{����.
�I����L�daA����{�� ��.
��Y��9�yL�	�$.��#<�`�d�&�de�h���#^��K��y�IHD�2�υ��[������{❇�>v��>'���}�0fj���^0�i��&�`��25m�ޤ��j�y�6̖�d���	��LD��:��Z�!�}�f>�[���i�C$�����[4��1�&0��)dS�kT$�����À)j���H1;_�BE�:E����{t��bv�zU�����)��B
r�bq���}\}"���@��X\��VDV��Z	υ'�]�������v���)\��^�S|���EO�T)�Z:p�J�0I�o�a���,uO��+�aKn7�n7	���0bJ �.!+K��"�=Qv�,�n#��n��{�#��5+J�"y���_�FY���ew���\1%����9�Rayh&E���"���,Ե���?FL$#H��N�y���$��fj����'y9)z���d(�J��!O|P�3g��,DG�
����q��-��c�롤�jJkA;B9�a�fKB2�+W�SU- ׌���8d���,(�V�i��q��d<3��G5 q	����i�O�Ã���=���Ew�8O��� �r:ՠ�f���-��L2�K���B%|2�0��8d���J���Wo��HL��l�A-���_���g�f����ՉE~�N,c=!������J6vt��#:�t�o0N�K�p��9ޟ�P��A������I����B�QU��D��GM ��<,H�Qb�̈�ϼf��Tُ�1�;�|�\��1DC2F�gZ��AM�9�< Y[�.b0nLK��G��䕃���u��;���� )����rPS�5���;H	�C�����B,RTS�3�~�����A{��I�B2�!c�ך��w)�;I�s�K�� y[ˬ����2Z��]G��*k!wcd�'H�\O1�[����Ʈ'�Qp�\���Ӝ��(��}	s����>#o#%�3#9���\r�9q`f.���d��)����^�)_�����86�Ҙ����%!���1sP�_q�W��LE�%��W2�ۆ�z���&ۖwtOG��с�{6>Q/���k���c�����'�%Q�'��;�s7��#�|�,^���G�#�h�O���AT�wt���� ����B~�%/@Q��W��tH�t��tP��������I�w�]ť\EQ =P��/������{��~�9aĂ��Hz�}?�b�o2����c<��\�r��3�6U:Xc.ìDO.����n;���e���G��(��
��*�ǣI��R�_V�K�#+P?yiOGhO�D�XF�I\����#Q�|������KO�����Bõ`r�3ێ9��Hc�}�]Q�ĵ��HO;.�%��%Q��-h"�|Z�f?2��9g^A�+H�=A�%�E~�%�E¨
U+�[�7ɗ�\�TEJX�(�*�Rvt���������&?�|���W����%�l�j�����@P��K=,�H��2'%�'O��L��C�]#iA��\U'JV����#��'������0�
 Y����x˗3�9�|��Ii\��+�!I��(u�?�aA�T��\I/��2*ѻR=裥S���g#�h�l�@H���+�N�I�PW���D÷�%�DG+�h���䮶_���fF�{`&�����+1[2pC�bI�bf��
�ДFc��H6"�<IГTAsM�>�%o,5�@�cF��P��@���B
��g�>%W�j��I�WͲ��_�T�B~G� �+��@�A<���\���]yVjԙ��cy"����mL�wD���BQ�4mF����w� �!
�{�Y��h��&�o�3mO���Y=���z���ݙ50�W��������5�iP���\��%!��s�������V^����M���`<�-z��w�Ҳ21&*X8����\0�c!	�M����@7b�-�;�ɔ<7e{3h��]S��c�W���T�,H5]`G�-LFA
MY��K�.��w���$�NC�bި[ٍ�e�R
�����p�����-�0[2r��)�3�����mt�?0|�MY��&7�������>;j��T3j���W�A���8J�G�C�	W��%!Y�4��T÷���J��¯�O�C������`�Ȯuk�t�8����JZ��oY��Z��L�:N��䐚��έ����1�Am&
eb�l��A(�iL~�&��9GY��z���;z���Hvr���QU A�Mr ױ� ��MG������U&jC���I�j&~��=�s�9.�������I_��x��2���с�J%��{m{��ױx��}�T��͖��D�&����hP$��%g�+�e$��G�"Q�Η�8>	�(�Bt�s�`��$$����(j��Պ$���r.�̲���"f�<�GɈzQ��*����Y7H�FF7��Ā�#o;Jl/��-%�Z��J���(ә����'m�h�̆�vm�-�4BpK���a�҅    ��V�FЎDMʰIK-�d�Obr�	K�r��Xr�����{�iLv����R�D��i�J���٭G��=���H�!?dO��d�Mk8�Z���B����Mk�����[&;��ATm)QO��i�臹0R��d##�{�G�;�|�`���nɑL/I����n�!?�%�@�h�jn�=��7�B�S/�������~Xo��1.�6	T��q�G���BU%.d
_M����A���y�25g��xl�?P�?��,Դ+��^��83+��-�z%fKB2�������BM�����"��3P����z���Cb�ðg�ei�,��<Ľ�+�u�8d�k�c0�<D���%!�|I��;gMDz�^zl�Z�!�}��Ag"��Y���D��<2���do�Y�����-D��Z�!�]?��Y��#���)L�^����i�5�!zG[�y�{Z�@��}\HГ4�a��&jz@ʌ���5���\0�e!��L���e�,T����R(O�m)n/F桦�U���[:p��VsK��K%�M=�<�T�̈́𞍃f"��yH��x0��]C��ww�y2w�s���{�� �,� 9G�����0o�Y�$�a��">��������$})�vw7�2�O)Y�j,��T���X�A��IA��1��
�ca�6k�U>��?�	f�Y)H����=�z�W�(�(Vb�d $g��*���D���2^Dh���Vg<��4J̖��l�P|��RVs�n���V-eK��~l�-����&�ҤjgO4K�C��^6�5hGx��ɘƜqHBr�l��J5a'�,ޖ��Cn��Yf�4i�hSOU�h�v�I�1�bGs��l����L��l�l� He�EK�)���%��AJe���tt�8`���Ltt ��f�:�N��c�X^�AfY��f�{H��]�������Qwc��aY�
+%�O�<��W*�+9d��S�(�c����׽]o�];�A;:T�yW�#�k��Ǣ�ʚD�d��=w=�;:T۟��s�7QN��_�`��A��=�N �6�
A����n(oh�?|V�m�����2�n��Ā�}�:Jl/���x��7'������P��':hժ�C��O==)�� �L�i�ې=!Jvp���]X9&kj&i���2�t�K��%���0T�4:X��m��u΂UV{|'�fr�ܪCr�ڑ"��� i����"d+����R�(`i��qY
E�%�v��x���(x�s��D����(`����oio̍q�D<o;U\P*������
��%E��S� RD-RN�(`d3��^8i���ݝ�^H�S��9��1P"���K�Gq�i�K�_ỻ5���>����p���Z���Z�v��^��MG�!3��4�;���s�	�䷇�핚>@� kK&{JD]�S՘�{ђ"Z��r��f��K��n��S, RY-A;���(`�h&{n�>��sc֪���n\�nAs�Ń8X�;JX�܎��
�r���!��2�������Y�ގ�YS��	������PO����Ā��M���$����F�0��#���xGY�V�?@� �3�-H�˘�����N�1��z-�%�.��-�7�N�In.�9"SvT9I�ӟ�P�� �r�g�ǡ%}B^&ݩ��U�C��}P����>�VIagQ�̤�N�gEMR�
��tNJ�3^���ǩ���ǬA��_�܅� )x�)ش���h�Hd���Q~�e�8��V�M^_��\�4����q���%� )좲 �������6C�Rb������2���>7lA"��+:���j)������&3���e�ʼ#��I����0��j]����B�Rb�LS�0�Q�5�C�n�7���Y}w;���4� >�+km{Jl/�))=)���W��e��,*����I��O�8/�����g��{J�d���Ӈ��N{�IFfK.��?����"�]f	c��:�/�|g$�j�A��J���1-�#�wA"Awl�4Ә��)LFi�9�k��Ao�՚ӂ)i͙�o��G��o��T��J�~�bL��(��BU檴d���d�l� Hl�&��A���z��z)��_���"�`՗C�n��۝��l��g������d���sB����i�;J����X%��VJ��`�.�IAT?�<��\(A[:�ăB��r8���L�-��w'���W�¨:嶣�O����fb�,ef�t#I�D���z/;BU�ȴdO�6u�%� �l��@�w2��5�ڄo�U��guD��<���	%��3���� /�ü�e��[Jl���HZB.ők�88R$26�-9�4��`��|��l5pG� �+q:���L�k�9���r6�.�f�=��3�(um����j���or�60��4�9?I��:Ԙw�>�3�Z�'�B� �g4��BG�샺�BG���c�~f����EQ�$>�X�=���j�b�&�Br.&� �B�+�PB�d��2W?�Ui��Ԏ/V��#|Be4Wl::T��-�#�l�Z2R���	Tl��X�(d�UE����(��-!���j��=]q#hG�"�gA��GѦ����-�<��Oqۜ4P�7���;�]x���_��A����Rns(K�|GO\H��:u�H��@;:T)�:����
��Tw��X2�L��^<U�||�W�pjɴ�U�HN�c%�v�j��p'�PG��S���A�7��{Z�"��i�7R"\�! e4o�9�!h^ ��yA��j��Iں�9�?͕�k�Z���e�+!\IT���@g#hK���Oɺy_�-�*ɑ�(Y�I>�J��*'#hK�j%lK�*�y�戛D��ޚ��qWu�}?�3���솬�\rY���Z
_S-*}�r�*�_�����uį�D���(l#�CvE��4�##��V`(7���%�y���~�I��v��M%�o;��&����=�L_��/kI�#�,p���$�WGpd8`�Z=L��Xi� �Y��g����֍D�yа����KK�� �0�|ce͑7`Z�'{K0�n$�s������\�X���\��e
_�R�|���ђ>#׶L������Q�{ah��Rb����1�Zm�Σ�t�ÖS�enG��K����R��f��T���@ gM1K�\�a\�R���&�%7j���,�i*&�̥�[�����+�7�[��ڐ0��8��f�����}s�E� )�e	4@�M�{�$��+Ux7��YW�<��A�Й�
T�;3_ᨉo��"3�	�y=61a��^�U�6~4���V�kO� ��MG� K'���x�d턪���n����v�CVWau��nh��:J�eo�{��~�P7y���B��O �H�V���-Y�M���5�E`�+sň�@߰���?�#�&�ӉB�f���}:��r���yŎzw�K�Q"����H��h%3���~U&<�������y+�C�#��3��D�Ղ��D�B�Qb��rsc��5Qi�#0<�KK7��0��Hkyp {#�;Jl����%+k�l�G� ���g�,����:RD��w��#��@:�����q7��^�3�j�/�ҫ��
sK���U[S��]+�ْjA)1��L�P\ᰱ@(�;�Q=�r6?�� q��[ᅷ69�!�a���3,�����g����vdz�d7�=7.�ڽt8l7C�Y��f�V��o��R"��F��&{i#��O�U5�܂$2�Aޛgl�)�(]��,�[e��� �Hd�	dd���{G� ��v������͓���ak��	
�4��x`��Q"�z��2���\�yY��yu�I�5yo�V��%>-�C+]��_}u}�	U���W��+.�L��1�+c��:��I����d㏲�]G����'���ͳ���#�#�����İG\�Z��VGk��R4c�V+��ya���L1��)3V[Rs�J���j�Ҳ��Ba���e��;�k�, F�B��8�Y��{;�o<ңUrom�_EMZ��]�    V�g����`��)1�1�@S�Ij��IT?�6���[N�9׎�{���/I�g�9q���\����0�UTKjR�^���U=@
����Ā���!OqRgx�s�Ϙ��nI@t���������@���ٞ��&3�n��1d�M4>�������;H"t^�.a,�Y�a,��zϮ7����s�-��n{���
'<���1�gs�=b�$�1oI1d.�gt���&L����ݒb&���� �p�s}ӧ�t����D�HO��*�ێ{�F�78�agV������+������X�suӛ�~��=�n��f�����po�ė� 3�\���Jۯ�jҎRz�5�,q�2�;{`9�����t�T�NލLo�w�	��\ݯL�q����]m��*��ɛ-8.�d��8d��d�H���\�� �����ɹ�rٖC�S'�%3J�h�,���R"�z�ҝm�Yq�>�a�v�к%Q�e�tN�FM6�}eo���������Hd=h�3s;JX��fn��ݩ�]]q��t�;��p] �l�L����b6ѕ�!H�R�)�B��A��-��
��[��%��]��v����ￍ>�y��VS-f:cR��#}FdA��h��Q"{��(���/E���1���{��zp�˙ �
��K����o����-Y�e��0�Rs[JDE8M��i�r��WkR8�)I_$ߑ�O��Ҷ#D`w�bg����8`��s,�E^芭��q�X����KK�ll;����R?��W�ǲ�6m�����PB������D����'���-*��Ui�^���κ���W��X�X�����YR槤��LXu��^�{��R��,AAb�oJ�B�Fgڻ�����-���7�P��8rw@�ơ�w��G�8�� �
Y��� �	�ݺ.�+9`թ9)�V��vǰ*	�#��p���Ǧ�D�g���(�S�n)���ݏ��]���!���:���!啱�:���K6(ٗ�눞���D>z�����D��JeG�l�����8V&�Lt�����*}�!�����-%�:�U�X:�([gy����X�� 7�%K"��ζϤ�u{B|>2�	 o�#���ܬ�{ďc�o��Q���Pw��E�A"yK5����V��w0W�?�Y��6E�Z����+:�?�����B�r6͙�ʖ/֏�U�S��Ja�	l����߻n����Xk0�Su̙�0we��0V��
ne�-ɬă�*ގ�}V]�X+��wU�>nƫW��SV����`������}=�2I$2�^�)_[�#�+�՝�,]�f���W��[�[ѩ�d��XZ5;NY�V�z�j�~l��:���%�?6�\��,e��,]:����ϓoY?�/�����K�-�x�)�-ϗ_%N��s(L��}%؟(�~�ֳ4��P����A��
�Q"�� 6]h�e�qen�y	�^�����*p�si�8+K�,�ц#w^)�>��]���RbF�~/��q'��7�.Yc�6��R#K�/В"V4�,��� k_ǎ�u�HK�sI�K֩�̳��k�-H�\pE��kC*i���WױЍS�a\�y���6�gu]�B6�|������%72�Pt���߭��Yi��ؑ[R�9H�C-%��0Cr38du��@x3�gƷ6�&EQ&o*�B�rtf;�"�Ffd�y;������^�;Jd�����>�Q��R�Ta"=`A��ב66\��	��D��ݿ;Jd/��%����H�1~�i�����iWWD�7��J�"x��n���� G�<��w��.3	��D�mX��l��.��ŖC���K�D#��,��~�(�Y��+w}�L,�|�w�	��Y�y�+pG�k��Q"҆c����QWv�2�M�4B�gwӨ��-)��V;J���kk,0���Cyv��|+tV�`�E�����BG��//-�JSI�d.�T��j)�D̔�Q��:�٫;Rٜ3��	d�6�Af��y��6G{� {e'�"V�܄���F��տV)������"3��<�w��e�#��q0;�+)�5rG� ;3{���w�0�ݩpW9<1"u ̒$���t�go�4`�^p�,�#l�ez�*�	A�
�����F+pG��G2�,5����u�D#���}��W$3��Ȃ+�[����%X�2��0��X�iā,ԭ�bE-�r)���ٚV�Tu��>�����`��֒b�Lk��t�u�/)^���ʚ�U*=rG�M����e��_�.�8G]�utd}wt�j�J�c����a#_��sZ���Q�!�U��kے�@�yа����KK�MpV�f�;���(@~�|�0T��FjS�;��8/�0�fu���LJ��J_?�U0��n�6A�#����pc`nB�첻+)�Xz�a�o�H>�0�v���pc9`��z.��Gi���%���g4t��ٳ�șRu�!�-"Y`��cl/f�.��;�$C'�>��ۑb����G���Ā��9l+dW���2�.	k���-H��d�����v��5��m���f�E��-1�	�2��;K��D#�$�dK���N�$L��ߵ3�;�G]�`fnG���h������:�$3o���ho"P?��#Ő�������=pK�k�::�8�6ye�X����B~��:={;R�����a�9�`�����ٙ�������	#	s9��gɕ�w��9�����?UrݑSU�,���H1ds��&89&��X+?q��9I}��G<z�v����GK� �_ގֲ��l�e����⃔���$0�tc�w�~�;5�A� �[!��+ss�oҕ2D�������H[yd�����%�j����}�8!e�\G�\NI�$8䝥�0[�;JX�`��K���������1�W���H1duIOK�\]5pG���TEL�4Z%�Ʉ��O�6��sE�m:,�ȴ#�ÔŁ���h1tB�3w��ZM���#!e��n-���}m�[s�j涔���+���B�9ЊZ��ݎCV{1.vn��.��B����^Y��:�H�Euԩ������ϑ�+s���i���%J8�|�J{f�Y��3ڽ8������h�g�g?��K���ì���37�a�|g�_^��E3W���~������X`���iq�1�Ƒ��3s��o�F�M��:����0���*����X�,� c�"�}9p��}�s%�ˎ�r瘭�(jo�LN=]��EG���S�s�bv��A�e��˿g�Ú�p�`�k�^&�5��g���^e� �u{�c``.�a��iw��tj��.a�W:���L �{�Xlru�!���=;fY`1���%E6�>��Ef\�rY�?Wpg��w�����)�hd��Rb��ʎ���q��Xl7Y6S��-����+:���Rb�j�2U�ⲝ������a��,�b.���x0��[JX��]�W����T�	�Q�eVt�Y$t���&�b�·��%�-+�튽t�"�����
��b��IU�bD��,�	f��Qb�j��b,�s�������h�D��Y�Q\8cU�X6ǒ
�쥌�����|fg�q�:]bH�:�J��1���@)���l���q�<��^Y`��z���]O����;*��~6O��(1`k'l+d7henN��;*�5�w�	����{��|����
�r9�ƅ�)Y��s�QeGI| ������seεX�ב�g8d��k��t���{-i��E�k�2Q��S���L�uJ�%;���|�R�t��>�q{J��K"�"l��Y�)ܧ�_ӓ�'i���sZ��#j�-^�=s�;s�E�W�����g�7("#�ŝ-R���m�ul4�f�z���'�):�!hd>�[#l�!+s��ܝ3w�)@���Y� �"�̃wv���\���vj���Ǟ����f,������e7����e�
S��� � A�9yg�sl`��)p�Df �����1�W9��K��d0���U߄��f`�����ĀY���2���;U\o
��    jK^�����ǩ�,8I&��0g�N� �d:�w���)[DҖ�L�}E?�Z�ƹ��P��w�6C�޹,b��p�>�T�]�"[}��x���J�.}��E���BK���Z�i)���0G]�W<fj�Z���3�6g�)1`uCǖ�7t��;cN��|�����]�(�b�dq�)����f'v/��9�Y�}6w3AZ61�#/����r�XX���w8��N�� �{!�V�?f�/��y���˶t��\�e-�N?���8�U�6η�3�z��{��Y�O���䤇W��''��/.�0�	h������!�{7߮��8��ڒ&�-��~6�TR�0_�AÞ�x��e-�!.���A�&�=ۣ#EXk���a����0װs)�pa���%���
��=/��0��	Z8c��T8�f����6��:+�`:B���z�1����0�8�d�Y8XT��;�U� �s������\�X��ca�V3��5t�iI�*��:��81���f�l�Pkg �sv蹔����(+ci�}�{�%�e�Ɍ����W��Z�0V��=�6��v���pc9`���M�tR��R��:?țp�ya���0��bYrE��o�v�9_!����2���nX4w�X�t¬y9ws?
��ƫ?L��.��O��|�����������V'2��m�)�\��+���� A��Eޛ?U�����-ǹ��&v]ի@��e�W�/��xi��
�p�`f����uwE�E}:�y���L[��� 3.��e�J{��(�vH/2�T�Ǥ�~Z\���n����)����蘇��[u�`T�� �T8�5Zriq{J��(F����3�>�0eY�|����9�d���Y��D����ʂ93V������݁��� �1=��t����{ȮomJ^����u�3{�ya���f�9;�;Y;u�nt�N"���~�6~n�7];��������;K[��y����C�NX��h.+���QH*�lN�aM�qag
�b���%�>�Yf�\%P<x���e=\Z�v�J����.>�H�Y�_t�(y،W�Q���v������e��-�D�d��"@��mb����Ā�mb�֢k�n�w��Dް����6گP`�ɅBv�%a�|�w�{ h��"�|u߸a�ⳛD؁��9&��߸���SQ�U�n��6/��fen	m;�w-��5:�v)�	�3�,�0��ܜ��rK�!s�5�G���H��ۄ;��B�5m���E-)�����S��E�e��
�Qb����Q6��v�Si��&�t�(���l)�M���Lo��/w1�e�k�
D����!�-i��D�PBZJ��kfZJx/��%��\~]���P����f7r�;�T�;R٩uז�5pG�3e�Kp������0�J?D�%�y�� �aB��c�r��`>�]iô��Х�tV.}bA�y�)�`wG��W���ύZsu6o*��^%sA���F"��Უ�a��;��� syS!f��ƛ�Y���<޼�6ȋ�%E���	-%�z���,�0f��B@0�"0�pY�a<��պOK��ux=�4�YB���u*0|�����0�ϓ�w�Q"{�n)1`�����.ʲ����hM}�7י��e��o#lV�'Z�Uw�0{s�'#*�݉�d 1��d�̓��:�����B}s[J��d���P��D��ȂD̥�{�~ͧ�yP� K��AN��<e��nm����e^�����,>[Jl/��mI1d��C,~*����xV��'�+����V�[RY��D6���mI�m�ܐ1��Ծ����N�{���O�~~��C�AZhp���>f.��>�8��v���������"��'��<+,�M�ޱ���ks�g�*�|jI�F&R�ZJ8h�it��^�[J�� �Ce���g-rK��Y�a\(�Չm%�z����1��:�����p� �qܩ���d�d$Ty�9��\���OB�u�%E�zͶ��0�b�X�3b�9��m`���gsVw%Ÿ�GnI���0G]Y�9Kz,ni�Ǖ�q���1���9g�P�wy"+_�t�1�`�2l�נ
��{��-)�<��L�W�Rb���>�7]�O�!?.{X�x�lwӍe0`�^0�,wK`KY��|�tY��r���c93��o2\R����Ռ?�A똥�u�%���F-�8f�C��U�	�LPȄ1��<��GP�Le�2����K��. ��^��;Jؾ��#���D;����K�V�V��aܭ��H� 8�	.j���o2<�|���J�GYP�6L�׷'�	�����#<�h�*���9u�}��"\�����+:���b�@���e�@`6�+�t�b���<�ər�8m.��n����vة����2������e\���j��Rb��n)1`����"m .�Cu�ƃ3gt�w��q%6Wd�v��eyxX���\$TIa�b�<{Y`���Rb{a���Ȭ���@m.��T;^1��	���|Qײ2�����3EV����� t-���ڃ$�Қ�L�؇V�O��w��>�2>��f�y�E[�I����0�)�����}�ᩝ�g.7��t�o�����r���B��̽���{��*Y�;e�����r����tZ�X�va�{�\ƺ	WsF�f����󐙫��#�:cދ�� c+pG�sV�����ʛ�%S��\����f~s`�-�Q"{�7�ZJ�{sg_���(3ѯ�	S�>7�Q��a�J�˕�!�Wiq���nP��=�m��}�����
�Qb���z���ڻ�԰2K��nڴ7�g�܉q�V���d���\J[��}7� �ƃ�-]X��N��i���h#j�a����`�zPw�0�ܩغZ����$b/��øp�nΕ1ϕ�U��>XgM��%�;g�ڻ�S5(��W�@�mƏ��-�����d��ے"<0 �������mEf�r�,w���)S���܂Dܥ�,w�A����k)��0T���2�f^�7�]c�N���r7�j[r�a*���"C��z/dNm^VF�HZ_���ԟp�g�.�?c��.�#sW��1{a���31�s��p�W�V�Ŀ����e��՛�|,Nyw����G��0w�J#�{�1{o�]���mWyE _>x���U���9{a�����4������*�Q@�����o�쓿��_m�:��l�Ξ��$V� �]F��[��4��9m��s�NpC�%!^x�cÝt	wi���Vݸ��lֶ�e�Η�~�s7�N�������^�-$�qw.���Uo8'�|U�̜����};�����Fܺ���2P�>c�۝6NǔdF2���ʹj��?�z콝%�G�Y1�����=�{y$��#�B���V�UN�
V��w�j=���.�=-@d�^� ���ʍ���f����|Z��uiG�)�f������^����'�Ќ�^�aL�>�E�����Ā�:�w��]���9V�w^�aL��V��蓮�(MN�O�Ι�;7�����c�y��l��w��3_�{̾H��e�w��&�Z��ά��ņ���^�al8L�,���l2��z�o�5��t���o������ّ��~þ�>�a����Sq7f�*���|���d��~,���U#ÿ"	�I`c�>W�I{hdnz�	=o��s殲��i�~y#����5��pW+�=�Y]���%��U2�p*�8��c�i��,�.��q���ܕv�������Y���p']�]����g�*����wl��~|�w�G�)�f�k�	}���5������V���)�˶>��=N�U���Z��E�ܹ���J�U�_����Ü{�(�]��|U���9�8J�|8�)����'n�C���H�U���6{.��_���J8���~�n��w�j}�Lv�	�$�ϟ�gWŐ��ԫ���g�4ǘ����\��tQ���5��xo�K[�Ai�r]4N�e��emޘ*����p��8U���o>_���V��9ֶ�j���"��Ӯx��R��s    Dᄖ�麃��q�mםz|+mv�.Q���$��/|B�����_�;���;�
������U9'�'��=�-%�z���e�KXq`��c�[�h�����p�ar�<���I�ܴ1;{�ʴ�Fp�~�ic7��&�B�74��az��$$]`��\`�w?7�QHg�/KXq�BŦ��� w?9�a0�f�Wc����^u-PK�qA�R�ٛ��H��ihU�?�ًx\Y�X_	�R"{a���2�O�o�vs��k��fN�aw�ăzy�*a��Ks>��J���`=8����=���:6Ҙ3�=�����l�G�#��L���-��¦Go�ԗ���f��[J�[2�+i��7λ�F�I�"�goM˹��{����W���}F��vQ���|6u�}Y����b�2�ɡ�����Í�C{�]Y�b�
6��X�do.c�j��^���%�[
��.���������JnvMy4�6ه�W����ZJ��S���G!E�g��E�h.4�$E;��hH�Rb���Vez���l�i:T��Itd�Grw6&Q&�/�V"Ne��2ڈT�����w��HrK�]r�e�r���[<��xsytZR�	���W���U����>�����0G]ry`�k5��,j���f%b/�Z�Os�u��V��9���/��Ib$�f�\f_���{��q7X��2���;��ߤ6��õ�\:�峾�sK����Ā�R�9n�����5�|gu���9���v����<�k����B�� ZR����;&��[��������[R�����}t��.�0�v�������/`$��P|�VZt��5�;Zi�ϯ���Ս�>]��3�ogD����c���qލF�'�ލ�M�63�~z�OFa�gD�94��*�eJ4+&���U+���}�VM߃�%E��{��[�S�!�kC�������i^#��#
C~�*���,�AG� ;��Q"���D��c��-��a�wy!���4�|nd�#\��A����|E)��L���Q6����D�{ђ6ȓy�n�
�ƉC"״}V�掴A���-)���CG��V��(1`���T�d/��p�^�b�h8o��;R9j�̎�e5pG�3��峡[�A���R���Yկ��Ɔ!�lu�cΰ@���AfT�iY����\��Ԍ��n�8ڞF�%�|��I>S�o�8i�k(GnT?�F$(�Z�'�e�w�0��QG�l���QG�3ztÝ��񙮈��U���7�#E����:�y���w��D��� #{1�v������d��.m�T�xtӝ�^fL׀|��`��)�����R"�5pG� ���#m�B&"o�C��Ŷ=��E8��u��#����v��\�=��GW��(1�1�;�O���κ��;���3��^a�w���vl>+��-)��w�����GvR��[�^;��?T�	�of+�'E\`z�CV+�-%�j��#Ő�|r��h�������:��#E؀ ��k�ގ�u�WG�!3���>P�Í:�{�#��gu�SG
3��ܑb�V�F8཭H����0�����(K0.�`���ٛ��y.�/�j�,2������b�y��>p�z34�A�}��3��q�)�IgF�*lc�:�ґ"gFN����x#nO���Q�TR�vr��]��������V�1_���^��Cf����2�e}L�fa�g��ZRD��'봔���p�������9Y��f���	'a1V�+d�nh>�c�,��z�R�~
pK�[�vb[�D���o㒓D�ь�>��g��H�?6��و�O�`�n
�G��ok<C�����h��}T^܎�	u�Q���� �Y���dO��r�!��I-�#m^RKb2�o�M���&�ڎ J��J{�#���%<�3�%/[����'?W^J^�r&��C�G�����Mׂ�t �2S��7]�X���^���P�u= �Iz�\x	�����t-!��t������gY�с���w����uW�B���-!��� �>�z+jK��w�%|Bu"���z�d�ك��@�g:�i�]��Չ����ǩ}A�/ݦ2I�L�NOP���~)!��ܟ��pNr�b��vt (�)dT�
��|�#�T�iS��Ԧ[�GL7A;BU�Ǝ\��hH �|�;��G�@�cS�)�-��n[A;B5���|%�rd*x���B��͗�#(��Mk�f;BU�����Ш([:T����=����2�4�;'%���VNv� �r�;�'P�ߴ�A��o	�P���1�V�?MJ\X���U�Fz�HC��9Иؖ�d��q�%�V�@�+'1�w�p0Jz���M����Z:��:��%;�P0gդ%�������c�] {��i�]��,"�����PkV&��#�a��&�J�m�/ja�Z�c��I�+�8
��o�0n��e�ؓ�Q`�o�"��`��T*`�J�����2M�m
Mj`^$�2պ!�^$%��"���J��r�QW�����[���b"���?��vQ��x"z��f�3 ������[�g1��² )�[�����Z3((LeAC�9� G�1D-<J6���X�*#����h�ҁ���n�!Gۙh�@H[���ݰ��N����?�鏿����������ǿ(<�P�|�-����iP4���A���E�]=���	�7r�_Kl��l �_��%ON6Ȗ�T2�!��Cx@�k����:�����7�ԗ����M�:��S*.���Dj��
��Ĭ+A����S���=p:n==�9�c���o�� %7�v b= KXAr�˅/!��g�7�4��pLd�/���٘�#*��Fl�sn���Sr��zZ�ĸ����yYƚ�h	5GR�y�t ��hɞ �2	 u�EK�)2�W�~�,���#񛌍�2�2��0��"�TZ��p�~3&���z$.�˘xcbu�dމ�����Hl�����7��@�*���F��.������e� ;nL6�r�����+9@`�G��2�j�hRSF\MI=o噫<U�\��Ok�1-U2��k.�����i�(2���ɨG�t �2M��;�XЧ���VNk��p�<��g�� �"6��t-���1��@Q��H�n�b�p&l�[��
c�.ޟ���6f���Sw~,�Y
��9:!�@�A��I�~"\�g�@��+�$������KK\s���׼���$��+9�7����L��yj��7�Ѹ�L69��Q�9�GMR1De͢`��S�)���:Z/�Q&MHʱ��c%A�ȼ|��%��3x�C.s��8�ɪ�c<��W|$���.�䀼B&����.���r��G��A�j���|�s��$���p����W�Ю�gd��.U�.�o؍]�I6�ZB;^q�����~/�d��[8̢n2?��P��$�ͶA[��8�NȺ��9�7�o��o��WH-��M�&NE���N����,8Wx6���� �*
˽W���=}��eh�Ɖ�(m���J��*/s�#r���Pς�oĄ����j� �!�\�28��4T������|!�M�j��j[��W��Wg��?@�`mC܆�����ױ��r^
�f۠9rtV^kHDC���0�Fpm#@fja�*ύm��m�T:�؄�i~ �n88 ��P��d�l�@H�y��%�}_=�P�o�c��AN:�k�����rA�e�b�l�@Hn��x﷓>�Sh,޸�Фi�}n��:�(�{0Z2�N�<I$$�bf��z�T2���#_�u����N�`�:-h�([^ �٬[������D��:T{�B���(��� �k���=��$-hG�"�gA��ϢM];R��k׌/E+i��?�¢�{z�#hG��E�k��k1[2��]tw��ȏYg���~S��-�#�։FgIwt0���4D�ј��)LƦ��zǏ1ɼ�%a��%�S-T;BU)�:���4"��JU�R楤z� �   ��Ԇ�������>�-(���-�#�Lc�M�vK[����z�����=�e������A�WbJ ���ޑ�9����ߔ����-hG�*�,�t��p$�L���c�(�"�D��T�Z:S)I[�GH�<ZJ�r���ITdG�w��Yĥu$�G"�Z�l��=~����|��A���-)�<駻���D#�j{O�l��OnI1dƹ�����~��qOs[      '     x�]�KN1@יSpW�'߻���	+���#�S!Z�O9Cr#�a�Ζ�_���������0zbp�ؐH�Y*���Xhw�p7��_�<��jB@l-1���`��!��k��ɂM|ژ���~����K?��r��F���:!��8j�Xk�:�a3�7�[����O��0yi#[�X5AdV�,P)���_���9�c�l��j��Q�p[�H~�&s�E�ݦ�F��xR��u2��E/�G����fȱ��o4�����i�~���t      )   �  x�m�[�� �o{-��x�%;Ie�1-�U3��S�G����_)��ח���R���.IGq���<�Cl����[�E*:5�b��9��f`���b�'�՞��F�V��ۥ���WfQ��!r�C�j��9��3�����#�9v�6������8��9n D�Q��\�[�A�I���D1d%#�(�D��$
�5�O����4�"A�$ȟ�f����3*�5�AI�&ʨ		�B����,Q
�B"�2$�{)�ZԻ`>�$	�~�t�}ķy�s]�窟6�e.��J�5$�"�HcY[|ѩc��8"��8/o�>_��#��(�����P߬3�yVox�vH�HSt���I:G���@�@3P���&@$H�H�v�"I��_TB��j�~Q�/�vȘ�(��SHi�g�H��������@j8��=-���?'v����7�8�N-�	���%�yj���>�C���u�$��P��U��hsv����#��)C��V��j�5�^-q�Wk�׫-F��K��yu�Rn���*m��J��U���fx��*�VZ��F�l��ֽp	��Lۛ�uoֽX��M3n�S��S+.�S��S;i^:���9�h[�f�Ui[�V�5S:[%��R�[ym����Ƀ�H���8���/U.�ңpK3yi�����q�k��gF�y�Jm�V\������um���P�5$�Q���om�I���A�b�s�T(����V�Էf���B�tm=\�~S��}���~h�      .   T   x�3�LL����T1JR14P	OKrO4�5�1�pvNq��vvO�0
*L��0�)0�H�H��.
JI�p1+s�,����� hFa      +   8  x��];���{N1������#O:�.���r$�)tw�n60��DvD[$2I ������������_���۟������������?�����<W����o_�oew\9;�`?�C@�-�3,�/��Ϗ[�:�#}̏ufDƯA�>�Ώ�3dJ��~���?�G�8?�G�d����	k��fS��	&E�����8m�c�B�lN���g���`gX
v���`Q��q�`�l�`�l�qV��Y�����&'���͕�j�	-�Vl�1��i	6vY�L��p �Z�=Z���x�+���`H���A:��R���T�M�8x�F'��^6�N����l`��n��-��a`�#S���`�X�.���f�N�r�f�;��d���!A�����<�e$`gp�_t.w�ǒGŰY�fДtZ���t`�ʂ)	�V	�}����%��݉E�V�)�n�'x�Q�����,���l��=�؃s��4{�3�@��p��E�9��:u��
���T�[�����QZl����2���P5���N�a����V�Q�#:�K�(.�����'{�!E�$pBwAAG����y�����
ݹ1ƀc�ɜ�T��y�A�b�l|��k����k������
�kh��A��N����l�.�(X4G
�Q}C��V�CX7���֭��
���4Os��!��j��{F	Q��)XL*����vv�x �`��R�7�|�hq�e�Tm �9�HR�h����gX{Z��j8���S�$gʬUun)�����1�4
̸n���h���b���\���V���PG�3��Υ2��R���GbEf��/�i�dp�{�����Gbp:��(h�f[w^9||M�^xA�r W�eG���q1_�8�m2�����R���[���3�.�݁����fM���幃fk�Y3]�Ւ�u2��2M0����ȫH�~�1�Q�q�@FCc ����Ihdtt�^<o44�W%43%MC��)�@Y��j6���z{6����1ѧ�g;�!L�z�J�G<`R+�2�����G���m�;v`��j>� 5�� 4�A���Ѩ�H�����f�V�4��	g��a��*��xn��S�~B,����>������vc����h�a,֫c]��S7�W�z<r����	Z��U�h�r���T�<Z�h?;�ώzB�6�������(���ɪp������c��d��X��+�x^�k�<�1/9��PA����	H�e����-���|̽��BZ1�+h�Ly�;��Q���|�	M�����$��n�psN	TN�.W37�N��	_^��
���48fu�������vfjp�D8zL"}&n�u�����3�T�F�/�1t3�E8m���}ip�R[m�.J�^�����hh���RL����D�Z���>�l2e�p��Øa���`�1����E*d�z�/1{=w�wV�+���]P�Ǳ3��藏���:I3n �������+���r����JKP��P܃4]�'I��������J��J�'U���*�)�-���"_�\��]��P���t�@N�em����Fwi�4�	i�4�		�4a�������SE�k�ݨ��O����[�J�������2��2}(D�����g�ek����(����P�ץRD�I�-ԋ����x!�� 8#�Ł�m��`C�3lcSD�yRѭ[��U<F�*�8ѳyZ�{yMs%@WP&��^&@��	P�{���D�^�	C�((��)0������p��.)RGA�?t
��SP�E���K� �xbo�H~@���N�1��=�1���T|����}@�v�
֙�݊�B�ڭF���(0�����E�ՍEa�'S��)X�3y��Tl��"K|9@_��|%X�U8o�I@u��ʘ���v����v%��wa��8#F����o>pmB��>�^L��CR\����+d�D<�H?s��$�5ϯ�1�=ˣ+i� ��1]��N�ra֫O��!�l8~];�H(��ֵo�0|�I;�s.�}�!C`��`��c��:�����DG��o��#��[��깕3��i��!�wq���q+7���V�$
�8��<�2��ŋE=��~J����?�Կ�>�,�uh�P�����@�7�	����-���^b��buj���%�T�9�r	Z؊7�xRK;�a�G��N�V|X'��vY*i��B�4��P�(#(��P���#X�Z������P���� �.�$�4��JUiTP5%"%}�$`I�;K�>xd*H�:1SQbP+�J`Hb���H����8Ѽ=˸N��1�J�$�*��t��w'�����\�Y�31�0�sO�w��0�?��r|�i������x��qE�����r<����g9V?�}�r�p'x�a`)�[yBP-kRĖ�x�����o��k��N�g�3V
�	�rDC��tk�b�A�X�"�!p�XS���"�,hꈧq�wڠi�D��B�T� �ٿ1}��� nY�	p;�F>��k��U�jhx�u$���R���J��)���D5;O����PW3�FMD#0*""�C4�lTCD�ڈF�Fr	������\�֜���w���.�Ee�-�(��œA�f<�qF^%��ŃF:[r[d��-�H�YsNg6�"�d����5�Ӈ
2��}k��k�W�����F$0������mi�%��!�}�!&a3}�!�u���f��ST�D)���?C�^���2W7��w���%��J�>��'j�!���'�n+x���~� ��B��I�r ��(�~��ތ���	|?q��<�\]��aޕ�b���Ty�fl SJ"y3̻����Q+ox��L��(�x�L@'���"C���k˰1Cp;1H�a$�jR	��T��&� ?M;�r5B#�c�e<.[&���D���
%�_C���P�j/!��$�N�	�3V������f���C�vo��F�>����Xy˺E��Q$`WO$0�|�G7+����nFiD#0J#�Q�.vU�B�m�L���T��f�龷���M}�6N��A�ޏB�7���5:������d�Nۑ-t�SO��B��:é�ȓ+��[�_p��rn�\|�2H���	�:� �r�i̾Z$ଢH`������*C�U.�:$0J����� ���i�����F`�zA1\=������~6:D:D:D:D��7HpQi#0��������1|%(>Ai�E	8�!p&E$0�i�焃~�j���,�`����	�[������L0I���ר�{���`�U*��YUf�;�}���q��)����PE�bO���]T���]�\�	�1���d�5Am�ˊ5���������+tXP�Ȕ��w\��	gN�'�ks�n+c1͠`�W�t��z�]�����,V�,��"`��՞��v�0��'�|c1��`q~,�Y]����c��Je-�,O&����D�Ӏ<���y��2�LP:�D:J��?}�������     