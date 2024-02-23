using articulo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


[Route("api/[controller]")]
[ApiController]

public class ArticulosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ArticulosController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Articulos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Articulo>>> GetArticulos()
    {
        var articulos = await _context.Articulo.ToListAsync();

        if (articulos == null || !articulos.Any())
        {
            return NotFound("No se encontraron artículos.");
        }

        return Ok(articulos);
    }

    // DELETE: api/Articulos/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteArticulo(int id)
    {
        var articulo = await _context.Articulo.FindAsync(id);

        if (articulo == null)
        {
            return NotFound();
        }

        _context.Articulo.Remove(articulo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // POST: api/Articulos
    [HttpPost]
    public async Task<ActionResult<Articulo>> PostArticulo(Articulo articulo)
    {
        // Verifica si el modelo cumple con las validaciones definidas en el modelo
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            _context.Articulo.Add(articulo);
            await _context.SaveChangesAsync();

            return Ok(articulo);

        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error al guardar el artículo");
        }
    }

    // PUT: api/Articulos
    [HttpPut("{id}")]
    public async Task<IActionResult> PutArticulo(int id, Articulo articulo)
    {
        if (id != articulo.Id)
        {
            return BadRequest("El ID del artículo no coincide con el ID en la URL.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Entry(articulo).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ArticuloExists(id))
            {
                return NotFound("El artículo especificado no fue encontrado.");
            }
            else
            {
                throw;
            }
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error al actualizar el artículo");
        }

        return NoContent();
    }

    // Método auxiliar para verificar si un artículo existe
    private bool ArticuloExists(int id)
    {
        return _context.Articulo.Any(e => e.Id == id);
    }

}
