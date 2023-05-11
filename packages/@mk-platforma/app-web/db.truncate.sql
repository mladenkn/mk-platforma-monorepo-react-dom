DO $$ 
DECLARE 
    table_name text; 
BEGIN 
    FOR table_name IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename NOT IN ('spatial_ref_sys')) 
    LOOP 
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(table_name) || ' CASCADE';
    END LOOP; 
END $$;
