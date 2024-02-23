namespace articulo.Models
{
    public class Articulo
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Contenido { get; set; }
        public int Autor { get; set; }
        public DateTime Fecha { get; set; }
    }
}
