1.  npm i
2.  npm start
3.  cp ./config/.env.example ./.env
4.  copy env example command
5.  To run the database seeds. in root directory, run:
    <!-- ====================================== -->
        for file in ./models/FakeData/*; do
        node "$file"
        done;
    <!-- ====================================== -->
