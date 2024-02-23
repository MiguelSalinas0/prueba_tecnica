using autor.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


[Route("api/[controller]")]
[ApiController]

public class AutoresController : ControllerBase
{
    private readonly AppDbContext _context;

    public AutoresController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Autores
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Autor>>> GetAutores()
    {
        var autores = await _context.Autor.ToListAsync();

        if (autores == null || !autores.Any())
        {
            return NotFound("No se encontraron artículos.");
        }

        return Ok(autores);
    }
}